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
  isLoading: boolean;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private auth: AuthService) {}
  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getUser(this.id);
  }
  getUser(id) {
    this.userService.getUser(id).subscribe(
      data => {
        this.foundedUser = data;
        this.isLoading = false;
      },
          err => console.log(err)
    );
  }
  setUserAge(user) {
    return new Date().getFullYear() - new Date(user.birthday).getFullYear();
  }
}
