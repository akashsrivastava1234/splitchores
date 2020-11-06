import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController,
  LoadingController } from '@ionic/angular';
  import { NavigationExtras } from '@angular/router';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { Globals, MemberFamily } from 'src/app/Globals';
import { Chores, Chore} from 'src/app/Chores';
import { EditGroupData, Member } from 'src/app/editGroupData';
import { HttpHeaders } from '@angular/common/http';
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
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private backgroundMode: BackgroundMode,
    private http:HttpClient,
    private localNotifications: LocalNotifications
  ) {
    //this.getFamiliesByMemberId();
    //this.getTasksByMemberId();
    console.log("homeresults called");
  }

  groupsName = Globals.groupsName;
  choresName = Chores.chores;
  ionViewWillEnter() {
    this.backgroundMode.enable();
    this.menuCtrl.enable(true);
    this.getTasksByMemberId();
    console.log("homeresults called ionView");
  }

  getFamiliesURL : string = "https://splitchores.azurewebsites.net/MemberFamilies/" + Globals.userId;
  getTasks : string = "https://splitchores.azurewebsites.net/tasks/" + Globals.userId;



  member = new Member("","","")
  getMemberByFamily() {
    var memberByFamilyURL = "https://splitchores.azurewebsites.net/FamilyMembers/";
    console.log("getMemberByFamily" + memberByFamilyURL + EditGroupData.GroupName.familyId);
    this.http.get(memberByFamilyURL + EditGroupData.GroupName.familyId, {
  })
      .subscribe(
          (val) => {
              console.log("Get Member by Family GET call successful value returned in body", 
                          val);
                          EditGroupData.memberNames = [];
                for (var v in val) {

                  this.member.fromJSON(val[v]);
                  EditGroupData.memberNames.push(this.member.clone());
                }    
          },
          response => {
              console.log("No New Notification");
          },
          () => {
//                  console.log("The POST observable is now completed.");
          });

  }

  chore = new Chore("", "", "oneTime", null, null, "", "1", "", "On Going", null, null);  
  getTasksByFamily() {
    var tasksByFamilyURL = "https://splitchores.azurewebsites.net/FamilyTask/" + EditGroupData.GroupName.familyId;
    console.log("getTasksByFamily"+ EditGroupData.GroupName.familyId);
    this.http.get(tasksByFamilyURL, {
  })
      .subscribe(
          (val) => {
              console.log("Get Tasks by familyGET call successful value returned in body", 
                          val);
                          Chores.chores = [];
                for (var v in val) {
                  this.chore.fromJSON(val[v]);
                  Chores.chores.push(this.chore.clone());
                }    
          },
          response => {
              console.log("No New Notification");
          },
          () => {
//                  console.log("The POST observable is now completed.");
          });
  }


  
  async getTasksByMemberId() {
    var getTasks = "http://splitchores.azurewebsites.net/MemberTask/" + Globals.userId;
    console.log("getTasksByMemberId : " + getTasks);
    this.http.get(getTasks, {
  })
      .subscribe(
          (val) => {
              console.log("Get Tasks by member GET call successful value returned in body", 
                          val);
                          Chores.chores = [];
                for (var v in val) {
                  this.chore.fromJSON(val[v]);
                  Chores.chores.push(this.chore.clone());
                }

                this.choresName = Chores.chores;
                
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
    const loader = await this.loadingCtrl.create({
      duration: 10000
    });
    loader.present();
    this.getMemberByFamily();
    this.getTasksByFamily();
    await Globals.delay(3500);
    loader.dismiss();

    this.navCtrl.navigateForward('/edit-group');
  }


  async completeTask(name: any) {
    console.log("Complete task called " + name);
    console.log("completed Bool value : " + this.chore.completedBool);
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    var completeTaskURL = "https://splitchores.azurewebsites.net/completeTask/" + name.id
    this.http.get(completeTaskURL, {headers
    })
        .subscribe(
            (val) => {
                console.log("Complete task url", 
                            val);
                            
                  for (var i = 0; i < Chores.chores.length; i++) {
                    if(Chores.chores[i].id == name.id) {
                      Chores.chores[i].status = "Completed"
                    }
                  }
                  this.toastBox("Task Completed!");
            },
            response => {
                console.log("No New Notification");
            },
            () => {
  //                  console.log("The POST observable is now completed.");
            });
    }
  
  async toastBox(errorMessage: string) {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        message: errorMessage,
        duration: 2000,
        position: 'bottom'
      });
  
      toast.present();
    }
   
}
