import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController , AlertController} from '@ionic/angular';
import { AuthService } from '../Service/Authentification/auth.service';
import { AvatarService } from "../Service/Avatar/avatar.service";
import { DocumentData } from 'firebase/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  profile: any;


  constructor(
    private authService : AuthService,
    private loadingController : LoadingController,
    private alertController : AlertController,
    private avatarService : AvatarService,
    private router :  Router
    ) {
      this.loadUserProfile();
       
    }

    ngOnInit() {
      this.loadUserProfile();
    }

    // Chargement de la photo de profil
    async loadUserProfile() {
      try {
        const data = await this.avatarService.getUserProfile();
        if (data) {
          this.profile = data;
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil :', error);
      }
    }

    // Deconnexion d'un Utilisateur 
    async logout(){
      const loading =  await this.loadingController.create({
        message: 'Deconnexion en cours...'
      });
      await loading.present();
      await this.authService.seDeconnecter();
      await loading.dismiss();
      this.router.navigateByUrl('/login',{ replaceUrl: true})

    }

    // cahnager les images de profiles 

    async changerImage(){

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType:CameraResultType.Base64,
        source: CameraSource.Photos
      });
      console.log(image);
      
      if (image) {
        const loading = await this.loadingController.create({
          message: 'Veuillez patienter ...'
        });
        await loading.present();

        const result = await this.avatarService.uploadImage(image);
        loading.dismiss();

      }else{
        this.showAlert('Erreur de Telechargement','Un probleme est survenue')
      }

    }

    // Popup d'alert de message
    async showAlert(header : string, message : string){
      const alert = await this.alertController.create({
        header,
        message,
        buttons : ['Okay']
      });
      alert.present();
    }

}
