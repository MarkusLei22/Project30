import {Component, Input, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Challange } from '../challange';
import {ChallangeService} from "../challange.service";
import {AuthService} from "../../authentication/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'ch-c-item',
  templateUrl: './c-item.component.html',
  styleUrls: ['./c-item.component.css']
})
export class CItemComponent implements OnInit, OnDestroy {
  @Input() challange: Challange;
  @Input() editable: boolean;
  completedToday: boolean;
  accDays: number;
  username: string;
  usernameSub: Subscription;

  constructor(private cService: ChallangeService,
              private authService: AuthService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.accDays = this.cService.getChallangeAccomplishedDays(this.challange);
    this.usernameSub = this.authService.getUsername(this.challange.uid).subscribe(
      (val: string) => this.username = val
    );
    this.completedToday = this.cService.checkCompletedToday(this.challange);
  }

  ngOnDestroy() {
    this.usernameSub.unsubscribe();
  }

  onComplete() {
    this.cService.completeToday(this.challange);
  }
}
