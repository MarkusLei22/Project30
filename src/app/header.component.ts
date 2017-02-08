import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {ChallangeService} from "./challange/challange.service";
import {Subscription} from "rxjs";
import {AuthService} from "./authentication/auth.service";
import {User} from "./authentication/user";

@Component({
  selector: 'ch-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  sub: Subscription;
  user: User = null;

  constructor(private router: Router,
              private cService: ChallangeService,
              private authService: AuthService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSignout() {
    this.authService.signout();
  }
}
