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
    private route: ActivatedRoute) { }

  groupName = null;
  memberNames = null;
  chores = null;
  ngOnInit() {
    this.getMemberByFamily();
    this.getTasksByFamily();
    this.groupName = EditGroupData.GroupName;
    this.memberNames = EditGroupData.memberNames;
    
    this.chores = Chores.chores
    console.log(this.memberNames);
  }


  memberByFamilyURL : string = "http://192.168.29.206:8081/MemberFamilies/";
  tasksByFamilyURL : string = "http://192.168.29.206:8081/FamilyTasks/" + EditGroupData.GroupName.familyId + "/";
  getMemberByFamily() {
    console.log("getMemberByFamily");
    this.http.get(this.memberByFamilyURL + EditGroupData.GroupName.familyId, {
  })
      .subscribe(
          (val) => {
              console.log("GET call successful value returned in body", 
                          val);
                          EditGroupData.memberNames = [];
                for (var v in val) {
                  EditGroupData.memberNames.push(new Member(v["memberId"], v["memberName"], v["points"]));
                }    
          },
          response => {
              console.log("No New Notification");
          },
          () => {
//                  console.log("The POST observable is now completed.");
          });

  }

  getTasksByFamily() {
    console.log("getTasksByFamily");
    this.http.get(this.tasksByFamilyURL, {
  })
      .subscribe(
          (val) => {
              console.log("GET call successful value returned in body", 
                          val);
                          Chores.chores = [];
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
      duration: 5000,
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
}

export class Group {

  constructor(
    public name: string
  ) {  }

}