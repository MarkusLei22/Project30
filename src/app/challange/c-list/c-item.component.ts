import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import { Challange } from '../challange';
import {ChallangeService} from "../challange.service";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'ch-c-item',
  templateUrl: './c-item.component.html',
  styleUrls: ['./c-item.component.css']
})
export class CItemComponent implements OnInit {
  @Input() challange: Challange;
  @Input() ownChallange: boolean;
  accDays: number;
  username: string;

  constructor(private cService: ChallangeService,
              private authService: AuthService) { }

  ngOnInit() {
    this.accDays = this.cService.getChallangeAccomplishedDays(this.challange);
    this.username = this.authService.getUsername(this.challange.uid);
  }

  onComplete() {
    this.cService.completeToday(this.challange);
  }
}
