import {Component, OnInit, Input} from '@angular/core';
import {Challange} from "../challange";
import {ChallangeService} from "../challange.service";

@Component({
  selector: 'ch-c-bar',
  templateUrl: './c-bar.component.html',
  styleUrls: ['./c-bar.component.css']
})
export class CBarComponent implements OnInit {
  progAcc: string;
  currDay: string;
  accDays: number;
  @Input() challange: Challange;

  constructor(private cService: ChallangeService) { }

  ngOnInit() {
    this.accDays = this.cService.getChallangeAccomplishedDays(this.challange);
    let acc = Math.round(this.accDays / 30 * 100);
    let days = Math.round(this.cService.getChallangeRuntime(this.challange) / 30 * 100);
    this.progAcc = acc + "%";
    this.currDay = days - acc + "%";
  }

}
