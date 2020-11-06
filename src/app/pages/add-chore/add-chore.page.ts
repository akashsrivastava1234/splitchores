import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Platform, NavController, ToastController, MenuController, AlertController, LoadingController } from '@ionic/angular';
import { ChoreRotationSchedule, Chores } from 'src/app/Chores';
import { Chore } from 'src/app/Chores';
import { Globals } from 'src/app/Globals';
import { EditGroupData } from 'src/app/editGroupData';
import {Renderer2 } from '@angular/core'

@Component({
  selector: 'app-add-chore',
  templateUrl: './add-chore.page.html',
  styleUrls: ['./add-chore.page.scss'],
})
export class AddChorePage implements OnInit {

  public onAddChoreForm: FormGroup;
  constructor(public plt: Platform,
    public nav: NavController,
    private modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private render : Renderer2,
    private http:HttpClient) { }

    memberNames = null;

  ngOnInit() {
    this.memberNames = EditGroupData.memberNames;
    this.onAddChoreForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'chorePoint': [null, Validators.compose([
        Validators.required
      ])],
      'choreType': [null, Validators.compose([
      ])],
      'choreMembers': [null, Validators.compose([
      ])]
    });
  }

  chore = new Chore("", "", Globals.userId, null, null, EditGroupData.GroupName.familyId, "1", "OneTime", "On Going", null, null);  
  addChoreURL : string = "http://splitchores.azurewebsites.net/createTask";
  async addChore() {
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

    var jsonObject = JSON.parse(JSON.stringify(this.chore))
    delete jsonObject.completedBool;
    console.log("POST BODY : " + JSON.stringify(jsonObject));

    this.http.post<Chore>(this.addChoreURL,
      jsonObject
    , {headers})
    .subscribe(
        (val) => {
            console.log("Add Chore POST call successful value returned in body", 
                        val);
            this.chore.fromJSON(val);
            console.log("pushed chore " + this.chore.id + " " + this.chore.name);
            Chores.chores.push(this.chore.clone());
            loader.dismiss();
            this.toastBox("Chore Added Successfully");
            this.closeModal();
            this.nav.navigateForward('/edit-group'); 
        },
        response => {
            console.log("POST call in error", response);
            // user already exists
            loader.duration = 1;
            loader.dismiss();
            this.toastBox("Group Already Exists");
        },
        () => {
            //console.log("The POST observable is now completed.");
            this.emptyFields(this.chore);
        });

          
        

  }


  closeModal() {
    this.nav.navigateForward('/edit-group'); 
  }

  emptyFields( choreDetails: Chore) {
    choreDetails.name = ""
    choreDetails.points = ""
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

  choreType = false;
  async selectChoreType(item : any) {
    console.log("Type : " + this.onAddChoreForm.get('choreType').value);
    if(this.onAddChoreForm.get('choreType').value == true) {
      this.chore.type = "Rotation";
    } else {
      this.chore.type = "OneTime";
    }
  }
 i = 1;
  async selectCheckBoxType(item: any) {

    console.log(item.memberName);
    if(this.onAddChoreForm.get('choreMembers').value == true) {
      if(this.chore.choresRotationSchedule == null) {
        this.chore.choresRotationSchedule = [new ChoreRotationSchedule(item.memberId, this.i)];
        this.chore.ownerId = item.memberId;
        this.i++;
      } else if(this.chore.type == "Rotation") {
        this.chore.choresRotationSchedule.push(new ChoreRotationSchedule(item.memberId, this.i));
        this.i++;
      }
      this.chore.total = this.i - 1;
    }
  }

}

export class ChoreLocal {

  constructor(
    public name: string, public email: string
  ) {  }

}