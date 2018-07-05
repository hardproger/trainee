import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import {StartComponent} from './start/start.component';
import { HomeComponent } from './home/home.component';

import { AuthGuardLogin } from './services/login-guard';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardLogin]},
  { path: '', component: StartComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
