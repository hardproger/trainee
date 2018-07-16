import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { AuthService } from '../services/auth.services';
import { UserService } from '../services/user.service';
import { OptionConfig } from '../services/option-config';

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
              private toastyService: ToastyService,
              private toastyConfig: ToastyConfig,
              private route: ActivatedRoute,
              public option: OptionConfig) {
    this.toastyConfig.theme = 'bootstrap';
  }
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
        this.toastyService.success(this.setOptions('success', 'The information was successfully updated!'));
      },
          err => {
        console.log(err);
        this.toastyService.error(this.setOptions('error', 'Ooops... Something went wrong :('));
      }
    );
  }
  setOptions(title, msg) {
    return {
      title: title,
      msg: msg,
      showClose: true,
      timeout: 2500,
      theme: 'bootstrap'
    };
  }
}
