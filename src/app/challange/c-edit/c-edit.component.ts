import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Challange} from "../challange";
import {ChallangeService} from "../challange.service";
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from "@angular/forms";
import {AuthService} from "../../authentication/auth.service";
import {Location} from "@angular/common";

@Component({
  selector: 'ch-c-edit',
  templateUrl: './c-edit.component.html',
  styleUrls: ['./c-edit.component.css']
})
export class CEditComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private cSub: Subscription;
  challange: Challange;

  isNew: boolean = true;
  editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private cService: ChallangeService,
              private authService: AuthService,
              private location: Location,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (param: any) => {
        if (param.hasOwnProperty('id')) {
          this.isNew = false;
          this.challange = this.cService.getChallange(param['id']);
        } else {
          this.challange = new Challange('', '', new Date(), false);
        }
      });

    this.cSub = this.cService.dataChanged.subscribe(
      (challanges: Challange[]) => this.challange = challanges[0]
    );

    this.InitializeForm();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  InitializeForm() {
    let expArray = new FormArray([]);

    if(this.challange.hasOwnProperty('exp')) {    // check because of empty arrays from datastorage
      for (let exp of this.challange.exp) {
        expArray.push(
          new FormControl(exp, Validators.required)
        );
      }
    }

    this.editForm = this.formBuilder.group({
      'title' : [this.challange.title, Validators.required],
      'desc' : [this.challange.desc, Validators.required],
      'exp' : expArray,
      'startDate' : [this.challange.startDate, Validators.required]
    });
  }

  onAddExp() {
    (<FormArray>this.editForm.controls['exp']).push(
      new FormControl('', Validators.required)
    );
  }

  onDeleteExp(index: number) {
    (<FormArray>this.editForm.controls['exp']).removeAt(index);
  }

  // TODO: custom validator to avoid starting dates in the future

  onSubmit() {
    const newChallange: Challange = this.editForm.value;
    newChallange.id = this.challange.id;
    newChallange.accomplished = this.challange.accomplished;
    newChallange.startDate = new Date(newChallange.startDate);
    newChallange.failed = false;
    newChallange.uid = this.authService.currentUser.uid;

    if(!this.isNew)
      this.cService.editChallange(this.challange, newChallange);
    else
      this.cService.addChallange(newChallange);

    this.location.back();
  }

  onDelete() {
    this.cService.deleteChallange(this.challange);
    this.location.back();
  }

}
