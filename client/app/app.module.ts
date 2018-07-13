import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import {ToastyModule} from 'ng2-toasty';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';

import { UserService } from './services/user.service';
import { AuthService } from './services/auth.services';
import { AuthGuardLogin } from './services/login-guard';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    StartComponent,
    LoginComponent,
    AccountComponent,
    RegisterComponent,
    FileSelectDirective,
    HomeComponent,
    ListComponent,
    ProfileComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    ToastyModule.forRoot(),
    HttpClientModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {tokenGetter: tokenGetter}
    })
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuardLogin
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
