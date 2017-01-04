import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Challange} from "../challange";
import {ChallangeService} from "../challange.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ch-c-detail',
  templateUrl: './c-detail.component.html',
  styleUrls: ['./c-detail.component.css']
})
export class CDetailComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  challange: Challange;
  id: number;

  constructor(private cService: ChallangeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (param: any) => {
        this.id = param['id'];
        this.challange = this.cService.getChallange(this.id);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
