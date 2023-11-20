import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController , AlertController } from '@ionic/angular';
import { AuthService } from '../Service/Authentification/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentials!: FormGroup;

  constructor(private toastController: ToastController,
      private loadingController: LoadingController,
      private authService : AuthService,
      private alertController : AlertController,
      private router: Router,
       public formBuilder: FormBuilder) { 
       }
  ngOnInit() {
    this.credentials = this.formBuilder.group({
      fullname:['',
        [Validators.required]
      ],
      contact:['',
      [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(9),
        // Validators.min(10)
      ]
    ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [
        Validators.required,
      ],
    ],
    });
  }

  get errorControl() {
    return this.credentials.controls;
  }

  async register(){ 
    const loading =  await this.loadingController.create({
      message: 'Veuillez patientez...'
    });
    await loading.present();
    const user =  await  this.authService.Inscrire(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/home',{ replaceUrl: true})
    }else{
        this.showAlert('Echec d\'inscription','S\'il vous plait verifier les identifiants');
    }

  }


  async showAlert(header : string, message : string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons : ['Okay']
    });
    alert.present();
  }
}  

