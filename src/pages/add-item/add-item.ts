import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';

// Model przedmiotu
import { Item } from '../../models/item/item';
// Biblioteka odpowiedzialna za stworzenie i walidacje formularza nowo tworzonego przedmiotu
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
// Providery
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ItemsProvider } from '../../providers/items/items';
import { CameraProvider  } from '../../providers/camera/camera';
// Pluginy
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
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
              public platform: Platform,
              public alertCtrl: AlertController,
  						public loadingCtrl: LoadingController, 
  						public navParams: NavParams,
  						private formBuilder: FormBuilder,
  						public itemsProvider: ItemsProvider,
  						private userProvider: AuthenticationProvider,
              public camera: CameraProvider,
              private localNotifications: LocalNotifications,
              private contacts: Contacts,
              ) {
  	this.addItemForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      person: '',
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      comment: ''
    })
     this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      this.getContacts();
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

  contactsList = [];
  categories = ['pieniądze', 'książka', 'narzędzia', 'urządzenia', 'samochód'];
  states = ['wypożyczam', 'pożyczam'];
  defaultImg = this.camera.defaultImage;
  endDate: any;

  async addItem() {
  	const loading = await this.loadingCtrl.create();
    const userId = this.userProvider.getUserId();
    const name = this.addItemForm.value.name;
    const state = this.addItemForm.value.state;
    const category = this.addItemForm.value.category;
    const person = this.addItemForm.value.person;
    const startDate = this.addItemForm.value.startDate;
    this.endDate = this.addItemForm.value.endDate;
    const comment = this.addItemForm.value.comment;
    const image = this.defaultImg;
    this.itemsProvider
      .createItem(name, userId, state, category, person, startDate, this.endDate, comment, image)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.addNotification(name, this.endDate);
            this.navCtrl.popToRoot();
          });
        },
        error => {
          console.error(error);
        }
      );

    return await this.navCtrl.popToRoot();

  }

  takePicture() {
    this.camera.takePicture();
    this.defaultImg = this.camera.image;
  }

  getPicture() {
    this.camera.openGallery();
    this.defaultImg = this.camera.image;
  }

  getContacts(): void {
    this.contacts.find(['name.formatted'], { filter: "", multiple: true })
      .then(data => {
        this.contactsList = data;
      });
  }

  notifications: any[] = [];

  addNotification(text, date) { 
    let notification = 
    {
      title: 'Tytuł',
      text: "Przypomnienie o: " + text,
      // { at: new Date(YYYY, MM, DD, hh, mm)}
      // 'Number' zamienia otrzymaną datę z typu string na typ number/int "2018" => 2018
      trigger: {at: new Date(
                Number(date.slice(0,4)), // YYYY
                Number(date.slice(5,7)),  // MM
                Number(date.slice(8,10)) - 1, // DD -- przypomnienie pojawi sie dzien przed koncem wypozyczenia/pozyczenia
                Number(date.slice(11,13)), // hh
                Number(date.slice(14,16)) // mm
                )}
    };
   this.notifications.push(notification);
   if(this.platform.is('cordova')){
        this.localNotifications.cancelAll().then(() => {
            this.localNotifications.schedule(this.notifications);
            this.notifications = [];
            let alert = this.alertCtrl.create({
                title: 'Powiadomianie dodane',
                buttons: ['Ok']
            });
            alert.present();
        });
    }
  }

}
