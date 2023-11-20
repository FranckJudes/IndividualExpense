import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterAvatarPage } from './register-avatar.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterAvatarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterAvatarPageRoutingModule {}
