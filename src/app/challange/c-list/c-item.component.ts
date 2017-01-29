import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import { Challange } from '../challange';
import {ChallangeService} from "../challange.service";

@Component({
  selector: 'ch-c-item',
  templateUrl: './c-item.component.html',
})
export class CItemComponent {
  @Input() challange: Challange;
  @Input() ownChallange: boolean;

  constructor(private cService: ChallangeService) { }

  onComplete() {
    this.cService.completeToday(this.challange);
  }
}
