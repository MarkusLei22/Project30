import { Component, OnInit } from '@angular/core';
import {Challange} from "../challange";
import {ChallangeService} from "../challange.service";

@Component({
  selector: 'ch-c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['./c-list.component.css']
})
export class CListComponent implements OnInit {
  challanges: Challange[] = [];

  constructor(private cService: ChallangeService) {
    this.challanges = cService.getChallanges();
  }

  ngOnInit() {
  }

}
