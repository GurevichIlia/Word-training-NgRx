"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../Models/User"));
const WordGroup_1 = __importStar(require("../Models/WordGroup"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const index_1 = require("./../helper-functions/index");
class WordGroupController {
    constructor() {
        this.getAllWordGroups = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const user = req.user as { _id: string, email: string }
                const user = yield User_1.default.findOne({ _id: req.user });
                const userGroups = yield WordGroup_1.default.find({
                    language: req.query.languageId,
                    user: user
                });
                let allGroups = [...this.getDefaultGroups(), ...userGroups];
                const words = index_1.getWordsByLanguage(req.query.languageId, user.words);
                const groups = this.setQuantityWordsInGroups(allGroups, words);
                res.status(200).json(groups);
            }
            catch (error) {
                errorHandler_1.default(res, error);
            }
        });
        this.saveGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groupCondidate = req.body.group;
                if (!groupCondidate)
                    return;
                let group;
                if (groupCondidate.id) {
                    group = (yield WordGroup_1.default.findOneAndUpdate({ _id: groupCondidate.id }, { name: groupCondidate.name }, { new: true }));
                }
                else {
                    console.log('NO ID');
                    group = yield new WordGroup_1.default({
                        name: groupCondidate.name,
                        language: groupCondidate.languageId,
                        user: req.user
                    }).save();
                }
                res.status(201).json(group);
            }
            catch (error) {
                errorHandler_1.default(res, error);
            }
        });
        this.deleteWordGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const removedGroup = yield WordGroup_1.default.findOneAndRemove({ _id: req.body.groupId });
                res.status(200).json({
                    removedGroup
                });
            }
            catch (error) {
                errorHandler_1.default(res, error);
            }
        });
        this.assignGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const groupIdForAssign = req.body.groupId;
                const selectedWords = req.body.selectedWords;
                const user = yield User_1.default.findOne({ _id: req.user });
                selectedWords.forEach(wordId => {
                    const existingWords = [...user.words];
                    user.words = existingWords.map(word => {
                        if (word._id.toString() == wordId) {
                            if (!word.assignedGroups.includes(groupIdForAssign)) {
                                const groups = [...word.assignedGroups];
                                groups.push(groupIdForAssign);
                                const newWord = Object.assign(Object.assign({}, word), { assignedGroups: groups });
                                return newWord;
                            }
                            else {
                                return word;
                            }
                        }
                        else {
                            return word;
                        }
                    });
                });
                const updatedUser = yield User_1.default.findOneAndUpdate({ _id: user._id }, { $set: user }, { new: true });
                res.status(200).json({
                    wordsAfterAssign: (_a = updatedUser) === null || _a === void 0 ? void 0 : _a.words,
                    message: 'Group assigned'
                });
            }
            catch (error) {
                errorHandler_1.default(res, error);
            }
        });
        this.setQuantityWordsInGroups = (groups, words) => {
            if (!words || words.length === 0)
                return groups;
            const updatedGroups = groups.map(group => {
                if (group._id == '1') {
                    const newGroup = Object.assign(Object.assign({}, group), { wordQuantity: words.length });
                    return newGroup;
                }
                if (group._id == '2') {
                    const newGroup = Object.assign(Object.assign({}, group), { wordQuantity: words.filter(word => word.isFavorite === true).length });
                    return newGroup;
                }
                const quantity = words.filter(word => word.assignedGroups.includes(group._id.toString()));
                group.wordQuantity = quantity.length;
                // console.log('COUNTED WORDS GROUPS', words.filter(word => console.log(word.assignedGroups[1], group._id)).length)
                return group;
            });
            return updatedGroups;
        };
        // public editWordGroupById = async (req: Request, res: Response) => {
        //       try {
        //             const editedWord = await Word.findOneAndUpdate(
        //                   { _id: req.body._id },
        //                   { $set: req.body },
        //                   { new: true }
        //             )
        //             res.status(200).json(editedWord)
        //       } catch (error) {
        //             errorHandler(res, error);
        //       }
        // };
        // public deleteWordGroupById = async (req: Request, res: Response) => {
        //       try {
        //             const deletedWord = await Word.findOneAndRemove({ _id: req.params.wordId })
        //             res.status(200).json({
        //                   word: deletedWord,
        //                   message: 'Removed'
        //             })
        //       } catch (error) {
        //             errorHandler(res, error);
        //       }
        // };
    }
    getDefaultGroups() {
        return [WordGroup_1.ALL_WORDS_GROUP, WordGroup_1.FAVORITES];
    }
}
exports.WordGroupController = WordGroupController;
//# sourceMappingURL=word-group.js.map