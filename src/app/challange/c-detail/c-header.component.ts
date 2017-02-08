import {Component, OnInit, Input} from '@angular/core';
import {Challange} from "../challange";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'ch-c-header',
  templateUrl: './c-header.component.html',
  styleUrls: ['./c-header.component.css']
})
export class CHeaderComponent implements OnInit {
  @Input() challange: Challange;
  cUsername: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.cUsername = this.authService.getUsername(this.challange.uid);
  }

}
