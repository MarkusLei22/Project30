import { Injectable } from '@angular/core';
import {Challange} from "./challange";

@Injectable()
export class ChallangeService {
  private challanges: Challange[] = [
    new Challange('#101', 'abcdefg'),
    new Challange('#123', 'zyxwvus')
  ];

  constructor() { }

  getChallanges() {
    return this.challanges;
  }

  getChallange(index: number) {
    return this.challanges[index];
  }


}
