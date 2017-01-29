import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Challange} from "../challange";
import {ChallangeService} from "../challange.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'ch-c-list',
  templateUrl: './c-list.component.html',
})
export class CListComponent implements OnInit, OnDestroy{
  challanges: Challange[] = [];
  sub: Subscription;
  subData: Subscription;
  myChallanges: boolean;

  constructor(
    private cService: ChallangeService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {

    //this.challanges = this.cService.getChallanges();
    this.subData = this.cService.dataChanged.subscribe(
      (data: Challange[]) => {
        this.challanges = data;
        this.changeDetector.detectChanges();
      }
    );

    // fetching the appropriate challanges
    this.sub = this.activatedRoute.params.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('userid')) {
          this.cService.fetchUserChallanges(this.authService.currentUser);
          this.myChallanges = true;
        }
        else {
          this.cService.fetchAllChallanges();
          this.myChallanges = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subData.unsubscribe();
  }
}
