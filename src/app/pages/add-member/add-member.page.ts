import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Platform, NavController, ToastController, MenuController, AlertController, LoadingController } from '@ionic/angular';
import { EditGroupData, Member } from 'src/app/editGroupData';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

  public onAddMemberForm: FormGroup;
  constructor(public plt: Platform,
    public nav: NavController,
    private modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private http:HttpClient) { }

  ngOnInit() {
    this.onAddMemberForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'emailId': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  member = new Member("", "", "");  
  addMemberURL : string = "http://192.168.29.206:8081/members/add";
  async addMember() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
    loader.present();
    //const headers = new HttpHeaders()
    //.set("Content-Type", "application/json");
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('responseType','text');

    this.http.post(this.addMemberURL,
    {
        "familyId" : EditGroupData.GroupName.familyId,
        "memberId" : this.member.memberId
    }, {headers})
    .subscribe(
        (val) => {
            //console.log("POST call successful value returned in body", 
            //            val);
            EditGroupData.memberNames.push(this.member);
            loader.dismiss();
            this.toastBox("Member Added Successfully");
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
            this.emptyFields(this.member);
        });
        //EditGroupData.memberNames.push(this.member.name)
        this.nav.navigateForward('/edit-group'); 
  }


  closeModal() {
    this.nav.navigateForward('/edit-group'); 
  }

  emptyFields( memberDetails: Member) {
    memberDetails.memberId = ""
    memberDetails.memberName = ""
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
}