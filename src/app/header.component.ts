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
  currentUserSub: Subscription;
  user: User = null;

  constructor(private router: Router,
              private cService: ChallangeService,
              private authService: AuthService) {}

  ngOnInit() {
    this.currentUserSub = this.authService.currentUserChanged.subscribe(
      user => this.user = user
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onNavigateHome() {
    if(this.user != null)
      this.router.navigate(['/challanges']);
    else
      this.router.navigate(['/']);
  }


  onNew() {
    this.router.navigate(['/user', this.user.uid, 'new']);
  }

  onSave() {
    this.cService.storeChallanges(this.user);
  }

  onSignout() {
    this.authService.signout();
  }
}
