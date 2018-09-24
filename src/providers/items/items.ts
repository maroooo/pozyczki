//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
import { Item } from '../../models/item/item';

/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemsProvider {

  private firestoreDB = this.fireStore.collection('items');
  
  constructor(private fireStore: AngularFirestore) {
    console.log('Hello ItemsProvider Provider');
  }

  createItem(name: string,
    user_id: string,
    state: string, 
    category: string, 
    person: string, 
    startDate: string, 
    endDate: string, 
    comment: string,
    image: string
  ): Promise<void> {
    const id = this.fireStore.createId();

    return this.fireStore.doc(`items/${id}`).set({
      id, user_id, name, state, category, person, startDate, endDate, comment, image
    });
  }


  editItem(itemId, item) {
    return this.firestoreDB.doc(itemId)
      .update({
        name: item.name,
        state: item.state,
        category: item.category,
        person: item.person,
        startDate: item.startDate,
        endDate: item.endDate,
        comment: item.comment,
        image: item.image
      });
  }


  // Zmienna przechowująca naszą kolekcję 'items' z bazy danych Firestore
  private firestoreDB = this.fireStore.collection('items');

  // Funkcja zwraca wszystkie przedmioty użytkownika o podanym 'user_id'
  getItemsList(user_id) {
    return this.fireStore.collection('items', ref => ref.where('user_id', '==', user_id)); 
  }

  // Funkcja usuwa z kolekcji przedmiot o podanym id
  deleteItem(itemId: string): Promise<void> {
    return this.firestoreDB.doc(itemId).delete();
  }

  getItemDetail(itemId: string) {
    return this.firestoreDB.doc(itemId);
  }

  createId() {
    return this.fireStore.createId();
  }

}
