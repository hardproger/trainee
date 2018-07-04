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
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';

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
    HomeComponent,
    LoginComponent,
    AccountComponent,
    RegisterComponent,
    FileSelectDirective
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
