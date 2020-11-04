import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Platform, NavController, ToastController, MenuController, AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";

import { Globals } from 'src/app/Globals';
import { EditGroupData } from 'src/app/editGroupData';
import { Chores } from 'src/app/Chores';

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
    this.groupName = EditGroupData.GroupName;
    this.memberNames = EditGroupData.memberNames;
    this.chores = Chores.chores
    console.log(this.memberNames);
  }


  editGroupURL : string = "http://192.168.29.206:8081/groups/edit";
  async editGroup() {
/*    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
    loader.present();
    //const headers = new HttpHeaders()
    //.set("Content-Type", "application/json");
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('responseType','text');

    this.http.post(this.editGroupURL,
    {
        "fullName" : this.group.name,
    }, {headers})
    .subscribe(
        (val) => {
            //console.log("POST call successful value returned in body", 
            //            val);
                        
            loader.dismiss();
            this.toastBox("Group Edited Successfully");
            this.closeModal();

        },
        response => {
            //console.log("POST call in error", response);
            // user already exists
            loader.duration = 1;
            loader.dismiss();
            this.toastBox("Group Already Exists");
        },
        () => {
            //console.log("The POST observable is now completed.");
            this.emptyFields(this.group);
        });*/

        Globals.groupsName.push(this.group.name)
        this.nav.navigateForward('/home-results'); 
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