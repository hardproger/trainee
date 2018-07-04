import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ToastyService, ToastyConfig} from 'ng2-toasty';
import { FileUploader } from 'ng2-file-upload';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: User = new User();
  users: User[] = [];
  roles: Array<string> = ['admin', 'moderator', 'user'];

  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/upload'});

  addUserForm: FormGroup;
  username = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private auth: AuthService,
              private toastyService: ToastyService,
              private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => {
      console.log(res);
    };
  }
  ngOnInit() {
    this.getUsers();
    this.addUserForm = this.formBuilder.group({
      username: this.username,
      role: this.role,
      password: this.password
    });
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error)
    );
  }
  deleteUser(user) {
    this.userService.deleteUser(user).subscribe(
      () => {
          this.getUsers();
          this.toastyService.success(this.setOptions('Success', 'The user was successfully deleted'));
        }
    );
  }
  addUser() {
    this.userService.addUser(this.addUserForm.value).subscribe(
      res => {
        this.users.push(res);
        this.getUsers();
        this.addUserForm.reset();
        this.toastyService.success(this.setOptions('Success', 'The user was successfully added'));
      },
      error => {
        console.log(error);
        this.toastyService.error(this.setOptions('Error', 'The username has already exists!'));
        this.addUserForm.reset();
      }
    );
  }
  save(user: User) {
    this.userService.editUser(user).subscribe(
      () => {
        if (this.auth.currentUser.id === user.id) {
          this.auth.currentUser.username = user.username;
          this.auth.currentUser.role = user.role;
        }
        this.getUsers();
        this.toastyService.success(this.setOptions('Success', 'The changes was successfully saved'));
      },
      error => {
        console.log(error);
        this.toastyService.error(this.setOptions('Error', 'The username has already exists!'));
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
