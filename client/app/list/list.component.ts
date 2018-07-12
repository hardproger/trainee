import { Component, OnInit, Injectable } from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

@Injectable()
export class ListComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      err => console.log(err)
    );
  }
  setUserImage(user) {
    return {'background-image': 'url(/assets/userImg/' + user.imgUrl + ')'};
  }
}
