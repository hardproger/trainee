import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'

import { User } from '../models/user';
import { AuthService } from '../services/auth.services';
import { UserService } from '../services/user.service';
import { OptionConfig } from '../services/option-config';
import { ToastService } from '../services/toasty.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  foundedUser: User;
  id: number;
  isLoading: boolean;
  constructor(private auth: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              public option: OptionConfig,
              private router: Router,
              public toast: ToastService) {}
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
  updateUser(user: User) {
    this.userService.editUser(user).subscribe(
      () => {
        this.getUser(this.foundedUser.id);
        this.toast.success('The information was successfully updated!');
      },
          err => {
        console.log(err);
        this.toast.error(err);
      }
    );
  }
}
