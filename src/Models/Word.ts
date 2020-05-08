import mongoose from "mongoose";
import { WordModel } from "../interfaces";

const Schema = mongoose.Schema;

const wordSchema = new Schema({
    word: {
        type: String,
        required: true
    },
    translation: {
        type: String,
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    levelKnowledge: {
        type: Number,
        default: 0
    },
    assignedGroups: {
        type: Array,
        default: ['1','2']
    },
    language: {
        ref: "languages",
        type: Schema.Types.ObjectId
    },
    user: {
        ref: "users",
        type: Schema.Types.ObjectId
    }
});

const Word = mongoose.model<WordModel>("words", wordSchema);

export default Word;
