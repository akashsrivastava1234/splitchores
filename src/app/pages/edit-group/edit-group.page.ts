import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Platform, NavController, ToastController, MenuController, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";

import { Globals } from 'src/app/Globals';
import { EditGroupData, Member } from 'src/app/editGroupData';
import { Chores, Chore } from 'src/app/Chores';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.page.html',
  styleUrls: ['./edit-group.page.scss'],
})
export class EditGroupPage implements OnInit {

  public onEditGroupForm: FormGroup;
  group = new Group("");
  constructor(public plt: Platform,
    public nav: NavController,
    private modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private route: ActivatedRoute) {
      this.memberNames = EditGroupData.memberNames;
      console.log("Constructor called edit group page")
     }

  groupName = null;
  memberNames = null;
  chores = null;
  user = Globals.userId;
  ngOnInit() {
    //this.getMemberByFamily();
    //this.getTasksByFamily();
    this.groupName = EditGroupData.GroupName;
    this.memberNames = EditGroupData.memberNames;
    this.chores = Chores.chores
    this.user = Globals.userId;
    console.log(this.user + " -> user");
    console.log(this.memberNames);
  }


  member = new Member("","","")
  memberByFamilyURL : string = "http://splitchores.azurewebsites.net/FamilyMembers/";
  tasksByFamilyURL : string = "http://splitchores.azurewebsites.net/FamilyTasks/" + EditGroupData.GroupName.familyId + "/";
  getMemberByFamily() {
    console.log("getMemberByFamily : " + this.memberByFamilyURL);
    this.http.get(this.memberByFamilyURL + EditGroupData.GroupName.familyId, {
  })
      .subscribe(
          (val) => {
              console.log("Get Member By Family GET call successful value returned in body", 
                          val);
                          EditGroupData.memberNames = [];
                for (var v in val) {
                  this.member.fromJSON(val[v]);
                  EditGroupData.memberNames.push(this.member.clone());
                }    
                this.memberNames = EditGroupData.memberNames;
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
                this.chores = Chores.chores;
          },
          response => {
              console.log("No New Notification");
          },
          () => {
//                  console.log("The POST observable is now completed.");
          });
  }


  closeModal() {
    this.nav.navigateForward('/home-results'); 
  }

  emptyFields( groupDetails: Group) {
    groupDetails.name = " "
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
  async goToMember(name: any) {

    /*let memberDetail: NavigationExtras = {
      queryParams: {
          currency: name
      }
    };*/

    //EditGroupData.GroupName = name;

    //this.navCtrl.navigateForward('/edit-group');
  }

  async addMember () {
    this.nav.navigateForward('/add-member');  
    //const modal = await this.modalCtrl.create({
//      component: SearchFilterPage
    //});
    //return await modal.present();
  }

  async addChore () {
    this.nav.navigateForward('/add-chore');  
    //const modal = await this.modalCtrl.create({
//      component: SearchFilterPage
    //});
    //return await modal.present();
  }


  async completeTask(name: any) {
    console.log("Complete task called " + name);
    console.log("completed Bool value : " + this.chore.completedBool);
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    var completeTaskURL = "http://splitchores.azurewebsites.net/completeTask/" + name.id
    this.http.get(completeTaskURL, {headers
    })
        .subscribe(
            async (val) => {
                console.log("Complete task url", 
                            val);
                            
                  for (var i = 0; i < Chores.chores.length; i++) {
                    if(Chores.chores[i].id == name.id) {
                      Chores.chores[i].status = "Completed"
                    }
                  }
                  await this.getMemberByFamily();
                  await this.getTasksByFamily();
                  this.toastBox("Task Completed!");
            },
            response => {
                console.log("No New Notification");
            },
            () => {
  //                  console.log("The POST observable is now completed.");
            });
    }
  


}

export class Group {

  constructor(
    public name: string
  ) {  }

}