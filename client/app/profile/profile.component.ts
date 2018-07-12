import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  id: number;
  foundedUser: User;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private auth: AuthService) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getUser(this.id);
  }
  getUser(id) {
    this.userService.getUser(id).subscribe(
      data => {
        console.log(data);
        this.foundedUser = data;
        console.log(this.foundedUser);
      },
          err => console.log(err)
    );
  }
}
