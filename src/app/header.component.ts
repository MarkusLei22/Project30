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
  currentUserSub: Subscription;
  user: User = null;

  constructor(private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
    this.currentUserSub = this.authService.currentUserChanged.subscribe(
      user => this.user = user
    );
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  onNew() {
    if(this.user) {
      this.router.navigate(['/user', this.user.uid, 'new']);
    } else {
      this.router.navigate(['/signin']);
    }
  }

  onMyChallanges() {
    if(this.user) {
      this.router.navigate(['/user', this.user.uid]);
    } else {
      this.router.navigate(['/signin']);
    }
  }

  onSignout() {
    this.authService.signout();
    this.router.navigate(['/signin']);
  }
}
