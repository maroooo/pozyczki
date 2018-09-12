import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication'
import { ItemsProvider } from '../../providers/items/items';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
  						private firestoreProvider: ItemsProvider, 
  						private userProvider: AuthenticationProvider,
  						public alertCtrl: AlertController) {

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

  async deleteItem(itemId) {
  	const alert = await this.alertCtrl.create({
  		message: 'Na pewno chcesz usunąć ten przedmiot?',
  		buttons: [
  			{
  				text: 'Anuluj',
  				role: 'cancel',
  				handler: () => {
  					console.log('Potwierdź: tak');
  				},
  			},
  			{
  				text: 'Tak',
  				handler: () => {
  					this.firestoreProvider.deleteItem(itemId);
  				},
  			},
  		],
  	});

  	await alert.present();
  }
}
