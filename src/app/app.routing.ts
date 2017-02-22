import {Routes, RouterModule} from "@angular/router";
import {CListComponent} from "./challange/c-list/c-list.component";
import {CDetailComponent} from "./challange/c-detail/c-detail.component";
import {CEditComponent} from "./challange/c-edit/c-edit.component";
import {SigninComponent} from "./authentication/signin.component";
import {SignupComponent} from "./authentication/signup.component";
import {AuthGuard} from "./authentication/auth.guard";
import {COverviewComponent} from "./challange/c-overview/c-overview.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";

const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'challanges', component: COverviewComponent},
  {path: 'challanges/:id', component: CDetailComponent},
  {path: 'user/:userid', component: COverviewComponent},
  {path: 'user/:userid/new', component: CEditComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  {path: 'user/:userid/:id', component: CDetailComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  {path: 'user/:userid/:id/edit', component: CEditComponent, canActivate: [AuthGuard]},

  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
