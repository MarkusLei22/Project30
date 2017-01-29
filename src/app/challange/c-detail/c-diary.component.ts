import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Challange} from "../challange";
import {ChallangeService} from "../challange.service";

@Component({
  selector: 'ch-c-diary',
  templateUrl: './c-diary.component.html',
  styleUrls: ['./c-diary.component.css']
})
export class CDiaryComponent implements OnInit {
  @Input() challange: Challange;
  @Output() diaryChanged: EventEmitter<any> = new EventEmitter();
  possibleDays: number;

  constructor(private cService: ChallangeService) { }

  ngOnInit() {
    this.possibleDays = this.cService.getChallangeRuntime(this.challange);
  }

  onDayClick(index:number) {
    if(index <= this.possibleDays) {
      this.challange.accomplished[index] = !this.challange.accomplished[index];
      this.diaryChanged.emit();
    }
  }
}
