import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterAvatarPageRoutingModule } from './register-avatar-routing.module';

import { RegisterAvatarPage } from './register-avatar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterAvatarPageRoutingModule
  ],
  declarations: [RegisterAvatarPage]
})
export class RegisterAvatarPageModule {}
