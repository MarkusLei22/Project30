import {Routes, RouterModule} from "@angular/router";
import {CListComponent} from "./challange/c-list/c-list.component";
import {CDetailComponent} from "./challange/c-detail/c-detail.component";

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/challanges', pathMatch:'full'},
  {path: 'challanges', component: CListComponent },
  {path: 'challanges/:id', component: CDetailComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
