import {Component, OnInit, Input} from '@angular/core';

declare var firebase: any;

@Component({
  selector: 'ch-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {
  @Input() uid: string;
  username: string;
  completed: number;
  ongoing: number;
  failed: number;

  constructor() { }

  ngOnInit() {
    firebase.database().ref('users/' + this.uid).once('value').then(
      (snapshot: any) => {
        if(snapshot.val() != null) {
          this.username = snapshot.val().username;
          this.completed = snapshot.val().c_completed.length;
          if(snapshot.val().c_completed == "0")
            this.completed = 0;
          this.ongoing = snapshot.val().c_ongoing.length;
          if(snapshot.val().c_ongoing == "0")
            this.ongoing = 0;
          this.failed = snapshot.val().c_failed.length;
          if(snapshot.val().c_failed == "0")
            this.failed = 0;
        }
      }
    )
  }

}
