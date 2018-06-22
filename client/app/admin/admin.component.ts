import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user = new User();
  users: User[] = [];

  addUserForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.getUsers();
    this.addUserForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
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
      () => this.getUsers()
    );
  }
  addUser() {
    this.userService.addUser(this.addUserForm.value).subscribe(
      res => {
        this.users.push(res);
        this.getUsers();
        this.addUserForm.reset();
      },
      error => console.log(error)
    );
  }
}
