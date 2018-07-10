import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService,
              private router: Router) {}
  ngOnInit() {
    console.log('onInit');
    this.userService.checkLogin().subscribe(
      () => {},
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    );
  }
}
