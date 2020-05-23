import { takeUntil, startWith, switchMap, take, finalize } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { VocabularyService } from './../../../vocabulary/vocabulary.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { GeneralFacade } from 'src/app/general.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription$ = new Subject();
  isShowMainScreen$ = new BehaviorSubject(true);
  constructor(
    private generaFacade: GeneralFacade
  ) { }

  ngOnInit() {
    this.generaFacade.isUpdateWordList$()
      .pipe(
        startWith(' '),
        takeUntil(this.subscription$)

      )
      .subscribe(() => this.getUserWords());
  }

  getUserWords() {
    this.generaFacade.getUserWordsFromServer()
      .pipe(
        take(1),
        finalize(() => this.isShowMainScreen$.next(false)),
        takeUntil(this.subscription$)

      ).subscribe(() => console.log('USER WORD GOT'));
  }





  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
    this.generaFacade.refreshGeneralState();
  }
}
