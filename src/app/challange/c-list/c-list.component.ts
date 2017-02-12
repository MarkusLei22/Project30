import {Component, Input} from '@angular/core';
import {Challange} from "../challange";

@Component({
  selector: 'ch-c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['./c-list.component.css']
})
export class CListComponent {
  @Input() challanges: Challange[];
  @Input() editable: boolean;

  constructor() {}
}
