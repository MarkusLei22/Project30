import {Routes, RouterModule} from "@angular/router";
import {CListComponent} from "./challange/c-list/c-list.component";
import {CDetailComponent} from "./challange/c-detail/c-detail.component";
import {CEditComponent} from "./challange/c-edit/c-edit.component";
import {SigninComponent} from "./authentication/signin.component";
import {SignupComponent} from "./authentication/signup.component";
import {AuthGuard} from "./authentication/auth.guard";

const APP_ROUTES: Routes = [
  {path: '', redirectTo:'challanges', pathMatch:'full'},
  {path: 'challanges', component: CListComponent, canActivate: [AuthGuard]},
  {path: 'challanges/:id', component: CDetailComponent, canActivate: [AuthGuard]},
  {path: 'user/:userid', component: CListComponent, canActivate: [AuthGuard]},
  {path: 'user/:userid/new', component: CEditComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  {path: 'user/:userid/:id', component: CDetailComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  {path: 'user/:userid/:id/edit', component: CEditComponent, canActivate: [AuthGuard]},

  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
