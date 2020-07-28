import { WordGroup } from 'src/app/shared/interfaces';
import { takeUntil, shareReplay } from 'rxjs/operators';
import { TrainResultService } from './train-result.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Word } from '../../shared/interfaces';
import { GroupStatistics } from 'src/app/shared/components/group-statistics/group-statistics.component';

@Component({
  selector: 'app-train-result',
  templateUrl: './train-result.component.html',
  styleUrls: ['./train-result.component.scss']
})
export class TrainResultComponent implements OnInit, OnDestroy {
  subscription$ = new Subject();

  trainedGroup$ = this.trainResultService.getTrainedGroup();
  trainingResult$ = this.trainResultService.getTrainingResult$().pipe(shareReplay());
  counterResult$ = this.trainResultService.counterResult$();
  statistics$: Observable<GroupStatistics>;
  constructor(
    private trainResultService: TrainResultService,
    private router: Router
  ) { }

  ngOnInit() {
    this.saveWordsTrainingProgress();
    this.getGroupStatistics();
  }

  changeGroup() {
    this.router.navigate(['word-training']);
  }

  trainAgain(group: WordGroup) {

    this.trainResultService.clearCounterState();
    this.trainResultService.setSelectedGroupForTraining(group);
    this.trainResultService.startTraining();
    this.router.navigate(['word-training/basic']);
  }

  goToVocabulary() {
    this.router.navigate(['vocabulary']);
  }

  saveWordsTrainingProgress() {
    this.trainResultService.updateWords()
      .pipe(
        takeUntil(this.subscription$)
      )
      .subscribe(res => console.log('WORDS AFTER UPDATE', res));
  }

  getGroupStatistics() {
    this.statistics$ = this.trainResultService.getGroupStatistics$(this.trainingResult$);
  }

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
