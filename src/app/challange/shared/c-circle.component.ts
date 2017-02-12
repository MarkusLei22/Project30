import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Challange} from "../challange";
import {ChallangeService} from "../challange.service";

@Component({
  selector: 'ch-c-circle',
  templateUrl: './c-circle.component.html',
  styleUrls: ['./c-circle.component.css']
})
export class CCircleComponent implements OnInit, OnChanges {
  pClass: string;
  accDays: number;
  @Input() challange: Challange;

  constructor(private cService: ChallangeService) { }

  ngOnInit() {
    this.accDays = this.cService.getChallangeAccomplishedDays(this.challange);
    let acc = Math.round(this.accDays / 30 * 100);
    this.pClass = 'progress-' + acc;
  }

  ngOnChanges() {
    this.accDays = this.cService.getChallangeAccomplishedDays(this.challange);
    let acc = Math.round(this.accDays / 30 * 100);
    this.pClass = 'progress-' + acc;
  }

}
