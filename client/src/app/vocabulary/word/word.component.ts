import { AssignWordsService } from './../assign-words.service';

import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Word, MenuItem, GeneralWord } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent implements OnInit {
  @Input() word: Word | GeneralWord;
  @Input() isShowMenu = true;
  @Input() isShowDefaultOptions = true;
  @Input() menuItems: MenuItem[];
  @Input() userId: string;
  @Output() action = new EventEmitter();

  constructor(
  ) { }


  ngOnInit() {
    // this.createEditFormForWord();
  }


  dispatchAction(action: string, payload: any) {
    this.action.emit({ action, payload });
  }

}
