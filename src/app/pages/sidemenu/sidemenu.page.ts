import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/Service/Authentification/auth.service';
import { AvatarService } from 'src/app/Service/Avatar/avatar.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {
    profile : any;
  constructor(
    private loadingController : LoadingController,
    private router: Router,
    private authService : AuthService,
    private avatarService : AvatarService,
  ) { }

  ngOnInit() {
    this.avatarService.getUserProfile().then((userData) => {
      this.profile = userData;
      console.log(userData);
      
    });
  }

  async logout(){
      const loading =  await this.loadingController.create({
        message: 'Deconnexion en cours...'
      });
      await loading.present();
      await this.authService.seDeconnecter();
      await loading.dismiss();
      this.router.navigateByUrl('/login',{ replaceUrl: true})
  }
}
