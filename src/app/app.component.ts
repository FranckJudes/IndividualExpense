import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  authService: any;
  constructor(
    private loadingController : LoadingController,

  ) {}


  async logout(){
    const loading =  await this.loadingController.create({
      message: 'Deconnexion en cours...'
    });
    await loading.present();
    // const user =  await  this.authService.Inscrire(this.credentials.value);
    // await loading.dismiss();

   
  }
}
