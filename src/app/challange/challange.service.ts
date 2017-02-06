import {Injectable, EventEmitter} from '@angular/core';
import {Challange} from "./challange";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {User} from "../authentication/user";
import {Observable} from "rxjs";

declare var firebase: any;

@Injectable()
export class ChallangeService {
  dataChanged = new EventEmitter<Challange[]>();

  private challanges: Challange[] = [];

  getChallanges() {
    console.log(this.challanges);
    return this.challanges;
  }

  getChallange(id: string) {
    if(this.challanges.length > 0) {
      return this.challanges.filter(
        (c: Challange) => c.id == id
      )[0];
    }
    else
      this.fetchChallange(id);
  }

  deleteChallange(challange: Challange) {
    this.removeChallangeDb(challange);
    this.challanges.splice(this.challanges.indexOf(challange), 1);
  }

  editChallange(oldChallange: Challange, newChallange: Challange) {
    this.confirmChallangeLegitity(newChallange);
    this.challanges[this.challanges.indexOf(oldChallange)] = newChallange;
    this.updateChallangeDb(newChallange);
  }

  addChallange(newChallange: Challange) {
    this.challanges.push(newChallange);
    this.addNewChallangeDb(newChallange);
  }

  fetchAllChallanges() {
    firebase.database().ref('challanges').on('value',
      (snapshot: any) => {
        if(snapshot.val() != null) {
          this.challanges = Object.keys(snapshot.val())
            .map(key => snapshot.val()[key]);
          for (let i = 0; i < this.challanges.length; i++) {
            this.challanges[i] = this.reformatStoredChallange(this.challanges[i]);
            this.confirmChallangeLegitity(this.challanges[i]);
          }
        }
        else
          this.challanges = [];
        this.dataChanged.emit(this.challanges);
      }
    );
  }

  fetchUserChallanges(user: User) {
    firebase.database().ref('challanges/').orderByChild('uid')
      .equalTo(user.uid).on('value',
      (snapshot: any) => {
        if(snapshot.val() != null) {
          this.challanges = Object.keys(snapshot.val())
            .map(key => snapshot.val()[key]);
          // set an empty experience array if no experiences
          for (let i = 0; i < this.challanges.length; i++) {
            this.challanges[i] = this.reformatStoredChallange(this.challanges[i]);
            this.confirmChallangeLegitity(this.challanges[i]);
          }
        }
        else
          this.challanges = [];
        this.dataChanged.emit(this.challanges);
      }
    );
  }

  fetchChallange(id: string) {
    firebase.database().ref('challanges/' + id).on('value',
      (snapshot: any) => {
        this.challanges = [];
        if(snapshot.val() != null) {
          this.challanges[0] = snapshot.val();
          for (let i = 0; i < this.challanges.length; i++) {
            this.challanges[i] = this.reformatStoredChallange(this.challanges[i]);
            this.confirmChallangeLegitity(this.challanges[i]);
          }
        }
        this.dataChanged.emit(this.challanges);
      })
  }

  addNewChallangeDb(newChallange: Challange) {
    let key = firebase.database().ref('challanges').push().key;
    newChallange.id = key;
    let challangeData = this.getChallangeDataObject(newChallange);

    let updates = {};
    updates['challanges/' + key] = challangeData;
    firebase.database().ref().update(updates)
  }

  updateChallangeDb(challange: Challange) {
    let challangeData = this.getChallangeDataObject(challange);

    let updates = {};
    updates['challanges/' + challange.id] = challangeData;
    firebase.database().ref().update(updates)
  }

  removeChallangeDb(challange: Challange) {
    firebase.database().ref('challanges/' + challange.id).remove();
  }

  confirmChallangeLegitity(challange: Challange) {
    if(this.getChallangeRuntime(challange) > this.getChallangeAccomplishedDays(challange) + 1)
      challange.failed = true;
    else
      challange.failed = false;
  }

  completeToday(challange: Challange) {
    let old: Challange = Object.assign({}, challange); // deep copy
    challange.accomplished[this.getChallangeRuntime(challange) - 1] = true;
    this.editChallange(old, challange);
  }


  getChallangeRuntime(challange: Challange) {
    let dif = new Date().getTime() - challange.startDate.getTime();
    return Math.trunc(dif / (1000 * 60 * 60 * 24)) + 1;
  }

  getChallangeAccomplishedDays(challange: Challange) {
    return challange.accomplished
      .filter(n => n === true).length;
  }

  private getChallangeDataObject(challange: Challange) {
    return {
      id : challange.id,
      title : challange.title,
      desc : challange.desc,
      startDate : challange.startDate.toDateString(),
      failed : challange.failed,
      uid : challange.uid,
      accomplished : challange.accomplished,
      exp : challange.exp
    }
  }

  private reformatStoredChallange(challange: Challange) {
      if (!challange.exp)
        challange.exp = [];
      challange.startDate = new Date(challange.startDate);
      return challange;
  }
}
