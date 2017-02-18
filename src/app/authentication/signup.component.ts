import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'ch-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  private errorSub: Subscription;
  errorMsg: string;
  error = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.initForm();
    this.errorSub = this.authService.errorEvent.subscribe(
      (error) => {
        console.log(error);
        this.errorMsg = this.parseErrorMessage(error);
        this.error = true;
        this.changeDetector.detectChanges();
      }
    );
  }

  initForm() {
    this.signupForm = this.fb.group({
      username : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      password2 : ['', Validators.required],
    })
  }

  parseErrorMessage(error) :string {
    switch(error.code) {
      case "auth/email-already-in-use":
        return "You do already have an account - please sign in :)";
      case "auth/weak-password":
        return "Your password is to easy to hack - it should have min 6 characters :)";
      default:
        return "Sorry this should not happen, please try again :)";
    }
  }

  // TODO: implement custom validator for validation password

  onSubmit() {
    this.authService.signup(this.signupForm.value);
  }
}
