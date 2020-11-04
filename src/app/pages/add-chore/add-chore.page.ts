import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Platform, NavController, ToastController, MenuController, AlertController, LoadingController } from '@ionic/angular';
import { Chores } from 'src/app/Chores';
import { Chore } from 'src/app/Chores';

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
    private http:HttpClient) { }

  ngOnInit() {
    this.onAddChoreForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'chorePoint': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  chore = new Chore("", "");  
  addChoreURL : string = "http://192.168.29.206:8081/groups/add";
  async addChore() {
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

    this.http.post(this.addChoreURL,
    {
        "fullName" : this.group.name,
    }, {headers})
    .subscribe(
        (val) => {
            //console.log("POST call successful value returned in body", 
            //            val);
                        
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
        });*/

        Chores.chores.push(this.chore)
        this.nav.navigateForward('/edit-group'); 
  }


  closeModal() {
    this.nav.navigateForward('/edit-group'); 
  }

  emptyFields( choreDetails: Chore) {
    choreDetails.choreName = ""
    choreDetails.chorePoint = ""
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

export class ChoreLocal {

  constructor(
    public name: string, public email: string
  ) {  }

}