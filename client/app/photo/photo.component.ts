import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute } from '@angular/router';
import {ToastyService, ToastyConfig} from 'ng2-toasty';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})

export class PhotoComponent {
  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/upload'});
  id: number;
  user: User;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private toastyService: ToastyService,
              private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getUser(this.id);
    this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => {
      this.user.id = this.id;
      this.user.imgUrl = res;
      this.updateUser(this.user);
    };
  }
  getUser(id) {
    this.userService.getUser(id).subscribe(
      data => {
        this.user = data;
      },
      err => console.log(err)
    );
  }
  updateUser(user: User) {
    this.userService.editUser(user).subscribe(
      () => this.toastyService.success(this.setOptions('Success', 'Photo was successfully updated!')),
      err => this.toastyService.error(this.setOptions('Error', err))
    )
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
