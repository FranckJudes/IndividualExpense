import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './Service/Authentification/auth.service';
import { AvatarService } from './Service/Avatar/avatar.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit  {
  profile : any;

  constructor(
    private loadingController : LoadingController,
    private router: Router,
    private authService : AuthService,
    private avatarService : AvatarService,

  ) {}

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
