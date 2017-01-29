import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'ch-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {

  private signinForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
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
