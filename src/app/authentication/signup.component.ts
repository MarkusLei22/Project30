import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
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
      confirmPassword : ['', Validators.required]
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

  isEqualPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.signupForm) {
      return {passwordsNotMatch: true};

    }
    if (control.value !== this.signupForm.controls['password'].value) {
      return {passwordsNotMatch: true};
    }
  }

  onSubmit() {
    if(this.signupForm.controls['password'].value == this.signupForm.controls['confirmPassword'].value)
      this.authService.signup(this.signupForm.value);
    else {
      this.errorMsg = 'You have entered two different passwords - choose the better one :)';
      this.error = true;
      this.changeDetector.detectChanges();
    }
  }
}
