import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { CameraProvider  } from '../../providers/camera/camera';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalNotifications } from '@ionic-native/local-notifications';
/**
 * Generated class for the EditItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

  editItemForm: FormGroup;
	itemId: string;
  constructor(public navCtrl: NavController, 
  						public navParams: NavParams,
              public alertCtrl: AlertController,
  						public itemsProvider: ItemsProvider,
  						private formBuilder: FormBuilder,
  						private contacts: Contacts,
  						public platform: Platform,
  						public camera: CameraProvider,
  						public loadingCtrl: LoadingController,
              public localNotifications: LocalNotifications
  						) {
  	this.editItemForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      person: '',
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      comment: ''
    });
    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      this.getContacts();
    });
    this.itemId = this.navParams.get("editId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  allContacts = [];
  addItemForm: FormGroup;
  image64 = this.camera.defaultImage;
  
  contactsList = [];
  states = ['wypożyczam', 'pożyczam'];
  categories = ['pieniądze', 'książka', 'narzędzia', 'urządzenia', 'samochód'];

  async editItem() {
    const loading = await this.loadingCtrl.create();
    const id = this.itemId;

    this.itemsProvider.editItem(id, {
	    name: this.addItemForm.value.name,
	    state: this.addItemForm.value.state,
	    category: this.addItemForm.value.category,
	    person: this.addItemForm.value.person,
	    startDate: this.addItemForm.value.startDate,
	    endDate: this.addItemForm.value.endDate,
	    comment: this.addItemForm.value.comment,
	    image: this.addItemForm.value.image
	    })
      .then(
        () => {
          loading.dismiss().then(() => {
            this.navCtrl.popToRoot();
          });
        },
        error => {
          console.error(error);
        }
      );

    return await this.navCtrl.popToRoot();
  }

  getContacts(): void {
    this.contacts.find(['displayName'], { filter: "", multiple: true })
      .then(data => {
        // this.contactsList = data;
        for (var i=0 ; i < data.length; i++){
          this.contactsList.push(data[i].displayName)
        }
    });
  }

}
