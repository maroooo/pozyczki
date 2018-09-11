import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item/item';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

	addItemForm: FormGroup;

  constructor(public navCtrl: NavController, 
  						public navParams: NavParams,
  						private formBuilder: FormBuilder) {
  	this.addItemForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      person: '',
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      comment: ''
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  item: Item = {
    id: '',
    uid: '',
    name: '',
    state: '',
    category: '',
    person: '',
    startDate: '',
    endDate: '',
    comment: '',
    image: ''
  }

  contactsList = ['Adam Nowak', 'Maciek', 'Jan Kowalski', 'Adam Małysz', 'Monika Bąk', 'Kapitan', 'Mama', 'Najlepszy Brat'];
  categories = ['pieniądze', 'książka', 'narzędzia', 'urządzenia', 'samochód'];
  states = ['wypożyczam', 'pożyczam'];

  addItem() {

  }

  takePicture() {

  }

  getPicture() {

  }
}
