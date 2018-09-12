import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items'
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

	public item: any;
	public itemId: string;

  constructor(public navCtrl: NavController, 
  						public navParams: NavParams,
  						private firestoreProvider: ItemsProvider,
  						public alertCtrl: AlertController,
  						public _DomSanitizer: DomSanitizer) {

  	// Przekazanie danych wybranego przedmiotu z listy przedmiotów
  	this.item = navParams.get('i');
  	this.item = this.item.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
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
