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

  private userChallangesRef;
  private allChallangesRef;
  private challangeRef;

  constructor() {
    this.userChallangesRef = firebase.database().ref('challanges');
    this.allChallangesRef = firebase.database().ref('challanges');
  }

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
    this.updateAccomplishedArray(oldChallange, newChallange);
    this.challanges[this.challanges.indexOf(oldChallange)] = newChallange;
    this.updateChallangeDb(newChallange);
  }

  addChallange(newChallange: Challange) {
    this.challanges.push(newChallange);
    this.addNewChallangeDb(newChallange);
  }

  updateAccomplishedArray(oldChallange: Challange, newChallange: Challange) {
    if(oldChallange.startDate < newChallange.startDate) {
      let timeDiff = Math.abs(oldChallange.startDate.getTime() - newChallange.startDate.getTime());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      let accDays = this.getChallangeAccomplishedDays(oldChallange);

      for(let i = accDays - 1; i > accDays - diffDays - 1; i--)
        newChallange.accomplished[i] = false;
    }
  }


  fetchAllChallanges() {
    this.allChallangesRef.off();
    this.allChallangesRef.on('value',
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
      },
    );
  }

  fetchUserChallanges(uid: string) {
    this.userChallangesRef.off();
    this.userChallangesRef.orderByChild('uid')
      .equalTo(uid).on('value',
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
    if(this.challangeRef)
      this.challangeRef.off();
    this.challangeRef = firebase.database().ref('challanges/' + id);
    this.challangeRef.on('value',
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
    firebase.database().ref().update(updates);
    this.addOngoingChallange(newChallange.uid, newChallange.id);
  }

  updateChallangeDb(challange: Challange) {
    let challangeData = this.getChallangeDataObject(challange);

    let updates = {};
    updates['challanges/' + challange.id] = challangeData;
    firebase.database().ref().update(updates);
  }

  removeChallangeDb(challange: Challange) {
    firebase.database().ref('challanges/' + challange.id).remove();
    this.deleteOngoingChallange(challange.uid, challange.id);
    this.deleteCompletedChallange(challange.uid, challange.id);
    this.deleteFailedChallange(challange.uid, challange.id);
  }



  addChallangeStats(ref: string, uid: string, cid: string) {
    let arrayData;

    firebase.database().ref('users/' + uid + '/' + ref)
      .once('value').then(
      (snapshot: any) => {
        arrayData = snapshot.val();
        if(arrayData === "0")
          arrayData = [];

        // to avoid saving a challange twice
        if(arrayData.indexOf(cid) != -1)
          return;

        arrayData.push(cid);

        let updates = {};
        updates['users/' + uid + '/' + ref] = arrayData;
        firebase.database().ref().update(updates);
      }
    );
  }

  deleteChallangeStats(ref: string, uid: string, cid: string) {
    let arrayData;

    firebase.database().ref('users/' + uid + '/' + ref)
      .once('value').then(
      (snapshot: any) => {
        arrayData = snapshot.val();
        if(arrayData === "0")
          arrayData = [];

        if(arrayData.indexOf(cid) == -1)
          return;

        arrayData.splice(arrayData.indexOf(cid), 1);

        if(arrayData.length == 0)
          arrayData = "0";

        let updates = {};
        updates['users/' + uid + '/' + ref] = arrayData;
        firebase.database().ref().update(updates);
      }
    );
  }


  addOngoingChallange(uid: string, cid: string) {
    this.addChallangeStats('c_ongoing', uid, cid);
  }

  deleteOngoingChallange(uid: string, cid: string) {
    this.deleteChallangeStats('c_ongoing', uid, cid);
  }

  addCompletedChallange(uid: string, cid: string) {
    this.addChallangeStats('c_completed', uid, cid);
  }

  deleteCompletedChallange(uid: string, cid: string) {
    this.deleteChallangeStats('c_completed', uid, cid);
  }

  addFailedChallange(uid: string, cid: string) {
    this.addChallangeStats('c_failed', uid, cid);
  }

  deleteFailedChallange(uid: string, cid: string) {
    this.deleteChallangeStats('c_failed', uid, cid);
  }


  confirmChallangeLegitity(challange: Challange) {
    let accDays = this.getChallangeAccomplishedDays(challange);
    let runtime = this.getChallangeRuntime(challange);
    if(accDays == 30) {
      challange.failed = false;
      challange.completed = true;
      this.deleteFailedChallange(challange.uid, challange.id);
      this.deleteOngoingChallange(challange.uid, challange.id);
      this.addCompletedChallange(challange.uid, challange.id);
      return;
    }

    if(runtime > accDays) {
      if(runtime-1 == accDays && !challange.accomplished[runtime - 1]) {
        challange.failed = false;
        this.deleteFailedChallange(challange.uid, challange.id);
        this.deleteCompletedChallange(challange.uid, challange.id);
        this.addOngoingChallange(challange.uid, challange.id);
        return;
      }
      challange.failed = true;
      this.deleteOngoingChallange(challange.uid, challange.id);
      this.deleteCompletedChallange(challange.uid, challange.id);
      this.addFailedChallange(challange.uid, challange.id);
    }
    else {
      challange.failed = false;
      this.deleteFailedChallange(challange.uid, challange.id);
      this.deleteCompletedChallange(challange.uid, challange.id);
      this.addOngoingChallange(challange.uid, challange.id);
    }
  }

  completeToday(challange: Challange) {
    challange.accomplished[this.getChallangeRuntime(challange) - 1] = true;
    this.updateChallangeDb(challange);
  }

  checkCompletedToday(challange: Challange) {
    return challange.accomplished[this.getChallangeRuntime(challange) - 1];
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
      startDate : challange.startDate.toString(),
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
