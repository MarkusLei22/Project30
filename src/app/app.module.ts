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
import { CDescComponent } from './challange/c-detail/c-desc.component';
import { CExpComponent } from './challange/c-detail/c-exp.component';
import { CDiaryComponent } from './challange/c-detail/c-diary.component';
import {AuthService} from "./authentication/auth.service";
import { SigninComponent } from './authentication/signin.component';
import { SignupComponent } from './authentication/signup.component';
import {AuthGuard} from "./authentication/auth.guard";
import { CCircleComponent } from './challange/shared/c-circle.component';
import { CHeaderComponent } from './challange/c-detail/c-header.component';
import {COverviewComponent} from "./challange/c-overview/c-overview.component";
import { UserStatsComponent } from './challange/c-overview/user-stats.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CListComponent,
    CItemComponent,
    CDetailComponent,
    HeaderComponent,
    CEditComponent,
    CDescComponent,
    CExpComponent,
    CDiaryComponent,
    SigninComponent,
    SignupComponent,
    CCircleComponent,
    CHeaderComponent,
    COverviewComponent,
    UserStatsComponent,
    LoadingIndicatorComponent,
    LandingPageComponent,
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
