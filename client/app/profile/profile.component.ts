import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.services';
import { OptionConfig } from '../services/option-config';
import { Photo } from '../models/photo';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  id: number;
  foundedUser: User;
  photos: Photo[] = [];
  isLoading: boolean;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private auth: AuthService,
              private photo: PhotoService,
              public option: OptionConfig) {}
  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getUser(this.id);
    this.getPhotos(this.id);
  }
  getUser(id) {
    this.userService.getUser(id).subscribe(
      data => {
        this.foundedUser = data;
        this.isLoading = false;
        console.log(this.foundedUser);
      },
          err => console.log(err)
    );
  }
  getPhotos(id) {
    this.photo.getPhotos(id).subscribe(
      data => {
        this.photos = data;
        console.log(this.photos);
      },
      err => console.log(err)
    );
  }
  setUserAge(user) {
    return new Date().getFullYear() - new Date(user.birthday).getFullYear();
  }
}
