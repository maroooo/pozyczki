import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication'
import { ItemsProvider } from '../../providers/items/items';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
  						private firestoreProvider: ItemsProvider, 
  						private userProvider: AuthenticationProvider,
  						public alertCtrl: AlertController,
  						public _DomSanitizer: DomSanitizer) {

  }

  itemsList: any;
  itemsCollection: any;

  ionViewDidLoad() {
    console.log("ItemListPage");
    const userId = this.userProvider.getUserId();
    
    if (userId != null) {
      this.itemsCollection = this.firestoreProvider.getItemsList(userId);
      this.itemsList = this.itemsCollection.valueChanges();
    }
  }

  goToAddItemPage() {
    console.log("Move to AddItemPage");
    this.navCtrl.push('AddItemPage');
  }

  goToDetailPage(item) {
  	this.navCtrl.push('DetailPage', {i: item, id: item.id});
  }
}
