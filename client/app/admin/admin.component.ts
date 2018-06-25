import { Component, OnInit} from '@angular/core';
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
  roles = ['admin', 'moderator', 'user'];

  addUserForm: FormGroup;
  username = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }
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
  save(user: User) {
    this.userService.editUser(user).subscribe(
      () => this.getUsers()
    );
  }
}
