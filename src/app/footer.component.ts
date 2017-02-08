import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "./authentication/auth.service";
import {User} from "./authentication/user";

@Component({
  selector: 'ch-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentUserSub: Subscription;
  user: User;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.currentUserSub = this.authService.currentUserChanged.subscribe(
      user => this.user = user
    );
  }

  onNew() {
    this.router.navigate(['/user', this.user.uid, 'new']);
  }

  onMyChallanges() {
    if(this.user) {
      this.router.navigate(['/user', this.user.uid]);
    } else {
      this.router.navigate(['/signin']);
    }
  }

}
