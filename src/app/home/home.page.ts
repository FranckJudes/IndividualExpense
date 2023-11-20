import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController , AlertController} from '@ionic/angular';
import { AuthService } from '../Service/Authentification/auth.service';
import { AvatarService } from "../Service/Avatar/avatar.service";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  profile: any;


  constructor(
    private authService : AuthService,
    private loadingController : LoadingController,
    private alertController : AlertController,
    private avatarService : AvatarService,
    private router :  Router,
    ) {
      this.avatarService.getUserProfile().then((userData) => {
        this.profile = userData;
      });
        
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
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
      });
  
      // console.log(image);
      
      if (image) {
        const loading = await this.loadingController.create({
          message: 'Veuillez patienter ...'
        });
        await loading.present();
        const result = await this.avatarService.uploadImage(image);
        loading.dismiss();
        console.log(result);
        
        if(!result){  
         this.showAlert('Echec','Probleme lors de l\'ajout de l\'avatar');
        }{
          this.router.navigateByUrl('/home',{ replaceUrl: true})
          // this.showAlert('Reussi','Mise a jour avec success');
        } 

      }else{
        this.showAlert('Erreur de Telechargement','Un probleme est survenue')
      }
      

    }

    // Popup d'alert de message
    async showAlert(header: string, message: string): Promise<void> {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: ['D\'accord'],
      });
      await alert.present();
    }

}
