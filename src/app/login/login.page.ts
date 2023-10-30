import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../Service/Authentification/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;
  
  constructor(
    private fb : FormBuilder,
    private loadingController : LoadingController,
    private alertController : AlertController,
    private authService : AuthService,
    private router : Router

  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],

    })
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
  
  async login(){
    const loading =  await this.loadingController.create({
      message: 'Veuillez patientez...',
      // 'duration': 5000
    });
    console.log(this.credentials.value);
    await loading.present();
    
    const user =  await  this.authService.Seconnecter(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/home',{ replaceUrl: true})
    }else{
        this.showAlert('Echec de connexion','S\'il vous plait verifier les identifiants');
    }
  }

 

  get email(){
    return this.credentials.get('email');
  }
  get password(){
    return this.credentials.get('password');
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
