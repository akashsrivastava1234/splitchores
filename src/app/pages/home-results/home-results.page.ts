import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
  import { NavigationExtras } from '@angular/router';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { Globals } from 'src/app/Globals';
import { EditGroupData } from 'src/app/editGroupData';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LatLng } from '@ionic-native/google-maps';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { HttpClient } from '@angular/common/http';
import { LocalNotifications} from '@ionic-native/local-notifications/ngx'

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage {
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.png';//CHECK THE IMAGE // CHECK HERE ICON

  

  constructor(
    public globals: Globals,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    private backgroundMode: BackgroundMode,
    private http:HttpClient,
    private localNotifications: LocalNotifications
  ) {
    this.groupsName = Globals.groupsName;
  }

  groupsName = null;
  ionViewWillEnter() {
    this.backgroundMode.enable();
    this.menuCtrl.enable(true);
    //this.getNotifications();
  }

  notifyUrl : string = "http://192.168.29.206:8081/notify";
  async getNotifications() {
    this.localNotifications.on('click').subscribe(notification => {
        //this.navCtrl.navigateRoot("/donate");
    });
      while(true) {
        //console.log("log");
        await this.delay(5000);

        
        this.http.post(this.notifyUrl, {
          "id" : Globals.userId
      })
          .subscribe(
              (val) => {
                  console.log("GET call successful value returned in body", 
                              val);
                    // Add the notification logic
                    this.localNotifications.schedule({
                      id: 1,
                      text: 'New location has been added in your area',
                      data: { secret: 'val' }
                    });
                    
              },
              response => {
                  console.log("No New Notification");
              },
              () => {
//                  console.log("The POST observable is now completed.");
              });
    


      }
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  

  settings() {
    this.navCtrl.navigateForward('settings');
  }




  async addGroup () {
    this.navCtrl.navigateRoot('/add-group');  
    //const modal = await this.modalCtrl.create({
//      component: SearchFilterPage
    //});
    //return await modal.present();
  }



   async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  async goToGroup(name: any) {

    /*let groupDetail: NavigationExtras = {
      queryParams: {
          currency: name
      }
    };*/

    EditGroupData.GroupName = name;

    this.navCtrl.navigateForward('/edit-group');
  }

}
