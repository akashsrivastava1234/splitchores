import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Platform, NavController, ToastController, MenuController, AlertController, LoadingController } from '@ionic/angular';
import { EditGroupData, Member } from 'src/app/editGroupData';
import { Globals } from 'src/app/Globals';

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
  addMemberURL : string = "http://splitchores.azurewebsites.net/Family";
  async addMember() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
    loader.present();

    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH');
    headers.append('responseType','text');


    var obj = {
      "familyId" : EditGroupData.GroupName.familyId,
      "members" : [{"memberId" : this.member.memberId, "memberName" : "xyz", "memberPoints" : 0}]};
    console.log(obj);
    this.http.patch(this.addMemberURL,
    obj, {headers})
    .subscribe(
       async (val) => {
            console.log("Add Member POST call successful value returned in body", 
                        val);
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

  }


  closeModal() {
    this.nav.navigateForward('/home-results'); 
  }

  emptyFields( memberDetails: Member) {
    memberDetails.memberId = ""
    memberDetails.memberName = ""
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




  getMemberByFamily(id) {
    var memberByFamilyURL  = "http://splitchores.azurewebsites.net/MemberFamilies/";
    console.log("getMemberByFamily");
    this.http.get(memberByFamilyURL + EditGroupData.GroupName.familyId, {
  })
      .subscribe(
          (val) => {
              console.log("Get Member By Family GET call successful value returned in body", 
                          val);
                for (var v in val) {
                  if (id == v["memberId"])
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

}