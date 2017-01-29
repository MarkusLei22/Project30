import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Challange} from "../challange";
import {ChallangeService} from "../challange.service";

@Component({
  selector: 'ch-c-desc',
  templateUrl: './c-desc.component.html',
})
export class CDescComponent {
  @Input() challange: Challange;
  @Output() editClicked = new EventEmitter();

  constructor() { }

  onClickEdit() {
    this.editClicked.emit();
  }
}
