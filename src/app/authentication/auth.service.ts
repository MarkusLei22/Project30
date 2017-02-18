import {Injectable, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {User} from "./user";
import {Router} from "@angular/router";
import {Subject, Subscription, Observable} from "rxjs";
import {type} from "os";

declare var firebase: any;

@Injectable()
export class AuthService {

  sub: Subscription;
  currentUserChanged: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User = new User();
  public errorEvent: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router)
  {
    this.fetchCurrentUser();
  }


  signin(user: User) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.router.navigate(['/challanges']);
        return true;
      })
      .catch(
        (error: string) => this.errorEvent.emit(error)
      );
  }

  signup(user: User) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        user.uid = firebase.auth().currentUser.uid;
        this.addNewUserToDb(user);
        this.router.navigate(['/challanges']);
      })
      .catch(
        error => this.errorEvent.emit(error)
      );
  }

  private addNewUserToDb(user: User) {
    firebase.database().ref('users/' + user.uid).set({
      username : user.username,
      email : user.email,
      c_ongoing : '0',
      c_completed : '0',
      c_failed : '0'
    });
  }

  signout() {
    firebase.auth().signOut();
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
    this.sub = firebase.auth().onAuthStateChanged(
      user => {
        let currUser: User = null;
        if(user != null) {
          currUser = new User();
          currUser.uid = user.uid;
          currUser.email = user.email;
          this.getUsername(currUser.uid).subscribe(
            (val: string) => {
              currUser.username = val;
              this.currentUser = currUser;
              this.currentUserChanged.emit(currUser);
              return;
            }
          );
        }
        this.currentUserChanged.emit(currUser);
      }
    )
  }

  getUsername(uid: string): Observable<string> {
    const subject = new Subject<string>();
    firebase.database().ref('users/' + uid).once('value').then(
      (snapshot: any) => {
        if(snapshot.val() != null)
          subject.next(snapshot.val().username)
      }
    );
    return subject.asObservable();
  }
}
