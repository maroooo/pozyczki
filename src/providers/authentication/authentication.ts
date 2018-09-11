import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user/user';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

	private user: Observable<firebase.User>;
	private userDetails: firebase.User = null;

  constructor(private angularAuth: AngularFireAuth) {
    console.log('Hello AuthenticationProvider Provider');
     this.user = angularAuth.authState;
     this.user.subscribe(
            (user) => {
                if (user) {
                    this.userDetails = user;
                    console.log("From service constructor subscribe:", this.userDetails);
                }
                else {
                    this.userDetails = null;
                }
            }
        );
  }

  getAuthState(){
    return this.angularAuth.authState;
  }

  login(user: User) {
		return this.angularAuth.auth.signInWithEmailAndPassword(user.email, user.password)
	}

	register(user: User) {
        return this.angularAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
  }

  logout() {
        this.angularAuth.auth.signOut();
  }

}
