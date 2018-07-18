import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private router: Router,
              private  auth: AuthService) {
    if (router.url === '/home') {
      router.navigate(['/home/list']);
    }
  }
  show() {
    $('.hidden-conver').toggleClass('show');
  }
}
