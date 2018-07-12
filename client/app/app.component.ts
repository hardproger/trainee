import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './services/user.service';
import { AuthService } from './services/auth.services';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService,
              private router: Router,
              private auth: AuthService) {}
  ngOnInit() {
    this.userService.checkLogin().subscribe(
      () => {},
      () => {
        localStorage.removeItem('token');
        this.auth.currentUser = new User();
        this.auth.loggedIn = false;
        this.auth.isAdmin = false;
        this.router.navigate(['/']);
      }
    );
  }
}
