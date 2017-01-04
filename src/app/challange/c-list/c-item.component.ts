import { Component, Input } from '@angular/core';
import { Challange } from '../challange';

@Component({
  selector: 'ch-c-item',
  templateUrl: './c-item.component.html',
  styleUrls: ['./c-item.component.css']
})
export class CItemComponent {
  @Input() challange: Challange;
  @Input() id: number;

  constructor() { }

}
