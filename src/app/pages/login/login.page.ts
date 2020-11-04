import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../Globals';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  providers: [ Globals ],
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  user = new User("", "");
  public onRegisterForm: FormGroup;
  signinURL = "http://192.168.29.206:8081/user/login"
  constructor(
    private globals: Globals,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private http:HttpClient
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
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

    await alert.present();
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  async goToHome() {
    const loader = await this.loadingCtrl.create({
      duration: 10000
    });
    loader.present();
    
    this.http.post(this.signinURL,
      {
          "password" : this.user.password,
          "id" : this.user.email
      })
      .subscribe(
          (val) => {
              //console.log("POST call successful value returned in body", 
              //            val);
                          
              loader.dismiss();
              
              Globals.UserName = val["fullName"];
              Globals.userId= val["id"];

              this.toastBox("SignIn Successful");
              this.navCtrl.navigateRoot('/home-results');  
  
          },
          response => {
              //console.log("POST call in error", response);
              // user already exists
              loader.duration = 1;
              loader.dismiss();
              this.toastBox("Email/Password Mismatch");
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
  

  
  emptyFields( userDetails: User) {
    userDetails.email = " "
    userDetails.password = "********"
  }


  async testFb() {
    this.navCtrl.navigateRoot('/home-results');  
  }

}

export class User {

  constructor(
    public email: string,
    public password: string
      ) {  }
}
