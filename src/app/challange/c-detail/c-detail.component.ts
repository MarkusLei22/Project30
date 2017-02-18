import {Component, OnInit, OnDestroy, ChangeDetectorRef, OnChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {Challange} from "../challange";
import {ChallangeService} from "../challange.service";
import {ActivatedRoute} from "@angular/router";
import {convertValueToOutputAst} from "@angular/compiler/src/output/value_util";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'ch-c-detail',
  templateUrl: './c-detail.component.html',
  styleUrls: ['./c-detail.component.css']
})
export class CDetailComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private dataSub: Subscription;
  private cid: string;
  challange: Challange = null;
  editable: boolean = false;

  constructor(private cService: ChallangeService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (param: any) => {
        this.cid = param['id'];
        if(param.hasOwnProperty('userid'))
          this.editable = (param['userid'] == this.authService.currentUser.uid);
        this.challange = this.cService.getChallange(this.cid);
      }
    );

    this.dataSub = this.cService.dataChanged.subscribe(
      (data: Challange[]) => {
        this.challange = this.cService.getChallange(this.cid);
        this.changeDetector.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.dataSub.unsubscribe();
  }

  onDiaryModified(oldChallange: Challange) {
    this.cService.updateChallangeDb(this.challange);
  }
}
