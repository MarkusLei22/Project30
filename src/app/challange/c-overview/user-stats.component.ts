import {Component, Input} from '@angular/core';

@Component({
  selector: 'ch-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent{
  @Input() username: string;
  @Input() completed: number;
  @Input() ongoing: number;
  @Input() failed: number;

  constructor() { }

}
