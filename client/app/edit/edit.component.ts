import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig } from 'ng2-toasty';

import { User } from '../models/user';
import { AuthService } from '../services/auth.services';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  user: User;
  isLoading: boolean;
  educations: Array<string> = ['basic', 'general', 'higher'];
  kidss: Array<string> = ['no', 'one', 'two', '3 and more'];
  comunas: Array<string> = ['las condes', 'caldera', 'huaro'];
  lookings: Array<string> = ['friends', 'dating', 'chat'];
  constructor(private auth: AuthService,
              private userService: UserService,
              private toastyService: ToastyService,
              private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
  }
  ngOnInit() {
    this.isLoading = true;
    this.getUser(this.auth.currentUser.id);
  }
  getUser(id) {
    this.userService.getUser(id).subscribe(
      data => {
        this.user = data;
        this.isLoading = false;
      },
          err => console.log(err)
    );
  }
  updateUser(user: User) {
    this.userService.editUser(user).subscribe(
      () => {
        this.getUser(this.user.id);
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
