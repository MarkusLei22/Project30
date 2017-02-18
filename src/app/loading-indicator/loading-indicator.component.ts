import {Component, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'ch-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent {
}


export class LoadingPage {
  public loading: boolean;

  constructor(val: boolean) {
    this.loading = val;
  }
  standby() {
    this.loading = true;
  }
  ready() {
    this.loading = false;
  }
}
