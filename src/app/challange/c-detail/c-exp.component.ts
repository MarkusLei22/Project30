import {Component, Input} from '@angular/core';
import {Challange} from "../challange";

@Component({
  selector: 'ch-c-exp',
  templateUrl: './c-exp.component.html',
  styleUrls: ['./c-exp.component.css']
})
export class CExpComponent {
  @Input() challange: Challange;

  constructor() { }
}
