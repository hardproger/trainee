import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import {StartComponent} from './start/start.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';

import { AuthGuardLogin } from './services/login-guard';
import {ListComponent} from './list/list.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardLogin]},
  { path: '', component: StartComponent },
  { path: 'home', component: HomeComponent,
    children: [
      {path: 'list', component: ListComponent},
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'edit', component: EditComponent}
    ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
