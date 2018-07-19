import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toasty.service';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})

export class PhotoComponent {
  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/api/upload'});
  id: number;
  user: User;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              public toast: ToastService,
              public auth: AuthService) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getUser(this.id);
    this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => {
      this.auth.currentUser.imgUrl = '/images/' + res;
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
      () => this.toast.success('Photo was successfully updated!'),
      err => this.toast.error(err)
    );
  }
}
