import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToAddItemPage() {
    console.log("Move to AddItemPage");
    this.navCtrl.push('AddItemPage');
  }

}
