import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user/user';
import { AuthenticationProvider } from '../../providers/authentication/authentication'

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	error;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthenticationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  user = {
		email : '',
		password : '',
	} as User;
  
  async register(user: User) {
        console.log("Register:", user);
        try {
            const result = await this.authProvider.register(user);
            if (result) {
                this.navCtrl.setRoot('ItemListPage');
            }
        } catch (e) {
            // console.error(e);
            this.error = e;
        }
    }

}
