import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FileUploader} from 'ng2-file-upload';

import { Photo } from '../models/photo';
import { PhotoService } from '../services/photo.service';
import { AuthService } from '../services/auth.services';
import { ToastService } from '../services/toasty.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {
  id: number;
  photos: Photo[] = [];
  newPhoto: Photo = {};
  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/api/upload'});
  constructor(private route: ActivatedRoute,
              private photo: PhotoService,
              private auth: AuthService,
              public toast: ToastService) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => {
      this.uploader.queue[0].remove();
    };
  }
  ngOnInit() {
    this.getPhotos(this.id);
  }
  getPhotos(id) {
    this.photo.getPhotos(id).subscribe(
      data => {
        this.photos = data;
        console.log(this.photos);
      },
      err => this.toast.error(err)
    );
  }
  deletePhoto(photo: Photo) {
    this.photo.deletePhoto(photo).subscribe(
      data => {
        this.toast.success('Photo was successfully deleted!');
        this.getPhotos(this.id);
      },
      err => this.toast.error(err)
    );
  }
  addPhoto(photo: Photo) {
    this.photo.addPhoto(photo).subscribe(
      () => {
        this.toast.success('Photo was successfully added!');
        this.getPhotos(this.id);
      },
      err => this.toast.error(err)
    );
  }
}
