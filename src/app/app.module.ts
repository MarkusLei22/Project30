import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CListComponent } from './challange/c-list/c-list.component';
import { CItemComponent } from './challange/c-list/c-item.component';
import { CDetailComponent } from './challange/c-detail/c-detail.component';
import { ChallangeService } from "./challange/challange.service";
import { HeaderComponent } from './header.component';
import { routing } from "./app.routing";
import { CEditComponent } from './challange/c-edit/c-edit.component';
import { CBarComponent } from './challange/shared/c-bar.component';
import { CDescComponent } from './challange/c-detail/c-desc.component';
import { CExpComponent } from './challange/c-detail/c-exp.component';
import { CDiaryComponent } from './challange/c-detail/c-diary.component';
import {AuthService} from "./authentication/auth.service";
import { SigninComponent } from './authentication/signin.component';
import { SignupComponent } from './authentication/signup.component';
import {AuthGuard} from "./authentication/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    CListComponent,
    CItemComponent,
    CDetailComponent,
    HeaderComponent,
    CEditComponent,
    CBarComponent,
    CBarComponent,
    CDescComponent,
    CExpComponent,
    CDiaryComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    ChallangeService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
