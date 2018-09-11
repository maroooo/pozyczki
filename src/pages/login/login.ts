import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user/user'
import { AuthenticationProvider } from '../../providers/authentication/authentication'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	error;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthenticationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  user = {
		email : '',
		password : '',
	} as User;

	async login(user: User) {
      console.log("Login:", user);
        try {
            const result = await this.authProvider.login(user);
            if (result) {
                this.navCtrl.setRoot('ItemListPage');
            }
        }
        catch (e) {
            // console.error(e);
            this.error = e;
        }
    }
	
	goToRegisterPage() {
    console.log("Move to SignupPage");
    this.navCtrl.push('SignupPage');
  }

}
