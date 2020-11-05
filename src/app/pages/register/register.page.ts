import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController, MenuController, AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = new User("", "", "");
  public onRegisterForm: FormGroup;
  signupURL = "https://splitchores.azurewebsites.net/createMember"
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private http:HttpClient
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async signUp() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
    loader.present();
    //const headers = new HttpHeaders()
    
    var headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('responseType','text');

    this.http.post(this.signupURL,
    {
        "memberName" : this.user.name,
        "password" : this.user.password,
        "id" : this.user.email
    }, {headers})
    .subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
                        
            loader.dismiss();
            this.toastBox("User Registered Successfully");
            this.goToLogin();

        },
        response => {
            //console.log("POST call in error", response);
            // user already exists
            loader.duration = 1;
            loader.dismiss();
            this.toastBox("User Already Exists");
        },
        () => {
            //console.log("The POST observable is now completed.");
            this.emptyFields(this.user);
        });



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

  async alertBox(errorMessage: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error?',
      message: errorMessage,
      buttons: [
      {
          text: 'OK',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 1000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email was sent successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });
  }

  emptyFields( userDetails: User) {
    userDetails.name = " "
    userDetails.email = " "
    userDetails.password = "********"
  }


  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
}


export class User {

  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {  }

}
