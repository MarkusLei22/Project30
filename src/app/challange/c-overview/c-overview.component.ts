import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Challange} from "../challange";
import {Subscription} from "rxjs";
import {ChallangeService} from "../challange.service";
import {AuthService} from "../../authentication/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ch-c-overview',
  templateUrl: './c-overview.component.html',
  styleUrls: ['./c-overview.component.css']
})
export class COverviewComponent implements OnInit, OnDestroy {
  challanges: Challange[] = [];
  sub: Subscription;
  subData: Subscription;
  editableChallanges: boolean;
  userChallanges: boolean;
  userid: string;

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
          this.userid = params.userid;
          this.userChallanges = true;
          this.cService.fetchUserChallanges(this.userid);
          if(this.userid == this.authService.currentUser.uid)
            this.editableChallanges = true;
          else
            this.editableChallanges = false;
        }
        else {
          this.cService.fetchAllChallanges();
          this.editableChallanges = false;
          this.userChallanges = false;
        }
        this.changeDetector.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subData.unsubscribe();
  }

}
