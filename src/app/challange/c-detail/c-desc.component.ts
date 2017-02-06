import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Challange} from "../challange";
import {ChallangeService} from "../challange.service";

@Component({
  selector: 'ch-c-desc',
  templateUrl: './c-desc.component.html',
  styleUrls: ['./c-desc.component.css']
})
export class CDescComponent{
  @Input() challange: Challange;

  constructor() { }
}
