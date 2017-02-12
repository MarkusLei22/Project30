import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Challange} from "../challange";
import {AuthService} from "../../authentication/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'ch-c-header',
  templateUrl: './c-header.component.html',
  styleUrls: ['./c-header.component.css']
})
export class CHeaderComponent implements OnInit, OnDestroy {
  @Input() challange: Challange;
  cUsername: string;
  usernameSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.usernameSub = this.authService.getUsername(this.challange.uid).subscribe(
      (val: string) => this.cUsername = val
    );
  }

  ngOnDestroy() {
    this.usernameSub.unsubscribe();
  }

}
