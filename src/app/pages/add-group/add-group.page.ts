import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Platform, NavController, ToastController, MenuController, AlertController, LoadingController } from '@ionic/angular';
import { Globals, MemberFamily } from 'src/app/Globals';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.page.html',
  styleUrls: ['./add-group.page.scss'],
})
export class AddGroupPage implements OnInit {

  public onAddGroupForm: FormGroup;
  group = new MemberFamily("", "", "0");
  constructor(public plt: Platform,
    public nav: NavController,
    private modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private http:HttpClient) { }
/*{
    "familyId":
    "familyName": 
    members:[id]
}*/
  ngOnInit() {
    this.onAddGroupForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])]
    });
  }


  addGroupURL : string = "https://splitchores.azurewebsites.net/Family";
  async addGroup() {
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
    var request = {
      "familyName" : this.group.familyName,
      "members" : [{"memberId" : Globals.userId}]
  };
  console.log(request);
  console.log("URL : " + this.addGroupURL)

    this.http.post(this.addGroupURL,
    request, {headers})
    .subscribe(
        (val) => {
            console.log("Add Family POST call successful value returned in body", 
                        val);
            Globals.groupsName.push(this.group.clone());
            loader.dismiss();
            this.toastBox("Group Added Successfully");
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
        });

        //Globals.groupsName.push(this.group.name)
  }


  closeModal() {
    this.nav.navigateForward('/home-results'); 
  }

  emptyFields( groupDetails: MemberFamily) {
    groupDetails.familyName = " "
    groupDetails.familyId = " "
    groupDetails.memberPoints = " "
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