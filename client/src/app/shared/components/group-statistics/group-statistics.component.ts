import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

export interface KnowledgeLevel {
  level: number;
  color: string;
  wordQuantity: number;
}

export interface GroupStatistics {
  knowledgeLevel: KnowledgeLevel[];
}

@Component({
  selector: 'app-group-statistics',
  templateUrl: './group-statistics.component.html',
  styleUrls: ['./group-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupStatisticsComponent implements OnInit {
  @Input() statistics: GroupStatistics;
  constructor() { }

  ngOnInit() {
  }

}