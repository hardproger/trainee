import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  users: User[] = [];
  p: number = 1;
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
          err => console.log(err)
    );
  }
  setUserImage(user) {
    return {'background-image': 'url(/images/' + user.imgUrl + ')'};
  }
  setUserAge(user) {
    return new Date().getFullYear() - new Date(user.birthday).getFullYear();
  }
}
