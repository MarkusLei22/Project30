import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CListComponent } from './challange/c-list/c-list.component';
import { CItemComponent } from './challange/c-list/c-item.component';
import { CDetailComponent } from './challange/c-detail/c-detail.component';
import {ChallangeService} from "./challange/challange.service";
import { HeaderComponent } from './header.component';
import {routing} from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    CListComponent,
    CItemComponent,
    CDetailComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ChallangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
