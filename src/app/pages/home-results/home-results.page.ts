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
import { Globals, MemberFamily } from 'src/app/Globals';
import { Chores, Chore} from 'src/app/Chores';
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
  choresName = null;
  ionViewWillEnter() {
    this.backgroundMode.enable();
    this.menuCtrl.enable(true);
    this.getFamiliesByMemberId();
    this.getTasksByMemberId();
    this.groupsName = Globals.groupsName;
    this.choresName = Chores.chores;
    //this.getNotifications();
  }

  getFamiliesURL : string = "http://192.168.29.206:8081/MemberFamilies/" + Globals.userId;
  getTasks : string = "http://192.168.29.206:8081/tasks/" + Globals.userId;

  getFamiliesByMemberId() {
        console.log("getFamiliesByMemberId");
        this.http.get(this.getFamiliesURL, {
      })
          .subscribe(
              (val) => {
                  console.log("GET call successful value returned in body", 
                              val);
                              Globals.groupsName = [];
                    for (var v in val) {
                      Globals.groupsName.push(new MemberFamily(v["familyId"], v["familyName"], v["memberPoints"]));
                    }
                    
              },
              response => {
                  console.log("No New Notification");
              },
              () => {
//                  console.log("The POST observable is now completed.");
              });
  }

  getTasksByMemberId() {
    console.log("getTasksByMemberId");
    this.http.get(this.getTasks, {
  })
      .subscribe(
          (val) => {
              console.log("GET call successful value returned in body", 
                          val);
                          Globals.groupsName = [];
                for (var v in val) {
                  Chores.chores.push(<Chore>JSON.parse(v));
                }
                
          },
          response => {
              console.log("No New Notification");
          },
          () => {
//                  console.log("The POST observable is now completed.");
          });
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
    console.log(name);
    EditGroupData.GroupName = name;

    this.navCtrl.navigateForward('/edit-group');
  }

}
