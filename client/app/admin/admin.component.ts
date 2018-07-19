import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../services/toasty.service';

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
  addUserForm: FormGroup;
  username = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private auth: AuthService,
              private toast: ToastService) {}
  ngOnInit() {
    this.getUsers();
    this.addUserForm = this.formBuilder.group({
      email: this.email,
      role: this.role,
      password: this.password,
      username: this.username
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
          this.toast.success('The user was successfully deleted');
        }
    );
  }
  addUser() {
    this.userService.addUser(this.addUserForm.value).subscribe(
      res => {
        this.users.push(res);
        this.getUsers();
        this.addUserForm.reset();
        this.toast.success('The user was successfully added');
      },
      error => {
        console.log(error);
        this.toast.error('The username has already exists!');
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
        this.toast.success('The changes was successfully save');
      },
      error => {
        console.log(error);
        this.toast.error('The username has already exists!');
      }
    );
  }
}
