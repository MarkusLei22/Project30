import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Subscription} from "rxjs";
import {Challange} from "../challange";
import {ChallangeService} from "../challange.service";
import {ActivatedRoute} from "@angular/router";
import {convertValueToOutputAst} from "@angular/compiler/src/output/value_util";

@Component({
  selector: 'ch-c-detail',
  templateUrl: './c-detail.component.html',

})
export class CDetailComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private dataSub: Subscription;
  challange: Challange = null;
  ownChallange: boolean = false;

  constructor(private cService: ChallangeService,
              private route: ActivatedRoute,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (param: any) => {
        this.challange = this.cService.getChallange(param['id']);
        this.ownChallange = param.hasOwnProperty('userid');
      }
    );

    this.dataSub = this.cService.dataChanged.subscribe(
      (data: Challange[]) => {
        this.challange = data[0];
        this.changeDetector.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.dataSub.unsubscribe();
  }

  onDiaryModified(oldChallange: Challange) {
    this.cService.editChallange(oldChallange, this.challange);
    this.changeDetector.detectChanges();
  }
}
