import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import {StartComponent} from './start/start.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
import { PhotoComponent } from './photo/photo.component';

import { AuthGuardLogin } from './services/login-guard';
import {ListComponent} from './list/list.component';
import {GalleryComponent} from './gallery/gallery.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardLogin]},
  { path: '', component: StartComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardLogin],
    children: [
      {path: 'list', component: ListComponent},
      {path: 'profile/id/:id', component: ProfileComponent},
      {path: 'edit/id/:id', component: EditComponent},
      {path: 'photo/id/:id', component: PhotoComponent},
      {path: 'gallery/id/:id', component: GalleryComponent}
    ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
