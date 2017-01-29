import {Injectable, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {User} from "./user";
import {Router} from "@angular/router";
import {Subject, Subscription, Observable} from "rxjs";
import {type} from "os";

declare var firebase: any;

@Injectable()
export class AuthService {

  currentUserChanged: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User = new User();

  constructor(private router: Router)
  {
    this.fetchCurrentUser();
  }


  signin(user: User) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(() => this.router.navigate(['/challanges']))
      .catch(function(error) {
        console.log(error);
      });
  }

  signup(user: User) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(() => this.router.navigate(['/challanges']))
      .catch(function(error) {
        console.log(error);
      });
  }

  signout() {
    firebase.auth().signOut();
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    const subject = new Subject<boolean>();  // like observable but is able to emit
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        subject.next(true); // emit true
      } else {
        subject.next(false);  // emit false
      }
    });

    return subject.asObservable();
  }

  fetchCurrentUser() {
    firebase.auth().onAuthStateChanged(
      user => {
        let currUser: User = null;
        if(user != null) {
          currUser = new User();
          currUser.uid = user.uid;
          currUser.displayName = user.displayName;
          currUser.email = user.email;
        }
        this.currentUser = currUser;
        this.currentUserChanged.emit(currUser);
      }
    )
  }
}
