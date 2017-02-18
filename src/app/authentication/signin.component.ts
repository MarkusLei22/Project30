import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'ch-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {

  private signinForm: FormGroup;
  private errorSub: Subscription;
  errorMsg: string;
  error = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.initForm();
    this.errorSub = this.authService.errorEvent.subscribe(
      (error) => {
        this.errorMsg = this.parseErrorMessage(error);
        this.error = true;
        this.changeDetector.detectChanges();
      }
    );
  }

  parseErrorMessage(error) :string {
    switch(error.code) {
      case "auth/user-not-found":
        return "I guess you haven't registerd yet - please sign up :)";
      case "auth/wrong-password":
        return "I think you entered the wrong password - just try again :)";
      default:
        return "Sorry this should not happen, please try again :)";
    }
  }

  initForm() {
    this.signinForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  onSubmit() {
    this.authService.signin(this.signinForm.value);
  }

}
