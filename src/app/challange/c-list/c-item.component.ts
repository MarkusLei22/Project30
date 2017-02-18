import {Component, Input, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Challange } from '../challange';
import {ChallangeService} from "../challange.service";
import {AuthService} from "../../authentication/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

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

  ready: boolean = false;

  constructor(private cService: ChallangeService,
              private authService: AuthService,
              private changeDetector: ChangeDetectorRef,
              private router: Router) { }

  ngOnInit() {
    this.accDays = this.cService.getChallangeAccomplishedDays(this.challange);
    this.usernameSub = this.authService.getUsername(this.challange.uid).subscribe(
      (val: string) => {
        this.username = val;
        this.ready = true;
        this.changeDetector.detectChanges();
      }
    );
    this.completedToday = this.cService.checkCompletedToday(this.challange);
  }

  ngOnDestroy() {
    this.usernameSub.unsubscribe();
  }

  onComplete() {
    this.cService.completeToday(this.challange);
  }

  onItemClick() {
    if(this.editable) {
      this.router.navigate(['/user', this.challange.uid, this.challange.id]);
    }
    else
      this.router.navigate(['/challanges', this.challange.id]);
  }
}
