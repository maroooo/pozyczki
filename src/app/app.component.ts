import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationProvider } from '../providers/authentication/authentication';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = "LoginPage";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authProvider: AuthenticationProvider) {
    platform.ready().then(() => {
      this.authProvider.getAuthState().subscribe(data => {
          if (data && data.email && data.uid) {
              this.nav.setRoot('ItemListPage');
          }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLogout() {
    this.authProvider.logout();
    this.nav.setRoot('LoginPage');
  }

  onExit() {
    this.authProvider.logout();
    //tutaj cos na wyjscie
  }

  goToItemListPage() {
    this.nav.setRoot('HomePage');
  }
}
