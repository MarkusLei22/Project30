import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Challange} from "../challange";
import {Subscription} from "rxjs";
import {ChallangeService} from "../challange.service";
import {AuthService} from "../../authentication/auth.service";
import {ActivatedRoute} from "@angular/router";
import {LoadingPage} from "../../loading-indicator/loading-indicator.component";
import {User} from "../../authentication/user";

declare var firebase: any;

@Component({
  selector: 'ch-c-overview',
  templateUrl: './c-overview.component.html',
  styleUrls: ['./c-overview.component.css']
})
export class COverviewComponent extends LoadingPage implements OnInit, OnDestroy {
  challanges: Challange[] = [];
  sub: Subscription;
  subData: Subscription;
  subAuth: Subscription;
  editableChallanges: boolean;
  userChallanges: boolean;
  userid: string;

  username: string;
  completed: number;
  ongoing: number;
  failed: number;

  dataReady: boolean;
  statsReady: boolean;

  constructor(
    private cService: ChallangeService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef) {
    super(true);
  }

  ngOnInit() {
    this.subAuth = this.authService.currentUserChanged.subscribe(
      (user: User) => {
        if(user)
          this.editableChallanges = (this.userid == user.uid)
        else
          this.editableChallanges = false
      }
    );

    this.subData = this.cService.dataChanged.subscribe(
      (data: Challange[]) => {
        this.challanges = data;
        this.dataReady = true;

        if(this.statsReady || !this.userChallanges) {
          this.ready();
          this.changeDetector.detectChanges();
        }
      }
    );


    // fetching the appropriate challanges
    this.sub = this.activatedRoute.params.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('userid')) {
          this.userid = params.userid;
          this.userChallanges = true;
          this.editableChallanges = (this.userid == this.authService.currentUser.uid);
          this.cService.fetchUserChallanges(this.userid);
        }
        else {
          this.editableChallanges = false;
          this.userChallanges = false;
          this.cService.fetchAllChallanges();
        }
      }
    );


    // fetching user stats
    if(this.userChallanges) {
      firebase.database().ref('users/' + this.userid).once('value').then(
        (snapshot: any) => {
          if(snapshot.val() != null) {
            this.username = snapshot.val().username;
            this.completed = snapshot.val().c_completed.length;
            if(snapshot.val().c_completed == "0")
              this.completed = 0;
            this.ongoing = snapshot.val().c_ongoing.length;
            if(snapshot.val().c_ongoing == "0")
              this.ongoing = 0;
            this.failed = snapshot.val().c_failed.length;
            if(snapshot.val().c_failed == "0")
              this.failed = 0;

            this.statsReady = true;
            if(this.dataReady) {
              this.ready();
              this.changeDetector.detectChanges();
            }
          }
        });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subData.unsubscribe();
    this.subAuth.unsubscribe();
  }

}
