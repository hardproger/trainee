import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;
  currentUser: User = new User();
  constructor(private userService: UserService,
              private router: Router,
              private jwtHelper: JwtHelperService,) {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenUser = this.jwtHelper.decodeToken(token).user;
      this.setCurrentUser(tokenUser);
    }
  }
  login(usernameAndPass) {
    return this.userService.login(usernameAndPass).map(
      res => {
        console.log(res);
        localStorage.setItem('token', res.user.token);
        const tokenUser = this.jwtHelper.decodeToken(res.user.token).user;
        this.setCurrentUser(tokenUser);
        return this.loggedIn;
      }
    );
  }
  logout() {
    this.userService.logout().subscribe(
      (res) => {
        console.log(res);
        localStorage.removeItem('token');
        this.currentUser = new User();
        this.loggedIn = false;
        this.isAdmin = false;
        this.router.navigate(['/']);
        },
        (err) => console.log(err)
    );
  }
  setCurrentUser(tokenUser) {
    this.loggedIn = true;
    this.currentUser.id = tokenUser.id;
    this.currentUser.username = tokenUser.username;
    this.currentUser.role = tokenUser.role;
    this.currentUser.imgUrl = '/images/' + tokenUser.imgUrl;
  }
}
