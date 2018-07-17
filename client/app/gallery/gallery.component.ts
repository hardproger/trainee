import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {ToastyService, ToastyConfig} from 'ng2-toasty';

import { Photo } from '../models/photo';
import { PhotoService } from '../services/photo.service';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {
  id: number;
  photos: Photo[] = [];
  newPhoto: Photo = {};
  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/upload'});
  constructor(private route: ActivatedRoute,
              private photo: PhotoService,
              private auth: AuthService,
              private toastyService: ToastyService,
              private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => {
      this.uploader.queue[0].remove();
      this.newPhoto.url = res;
      this.newPhoto.userId = this.id;
      this.addPhoto(this.newPhoto);
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
      err => this.toastyService.error(this.setOptions('Error', err))
    );
  }
  deletePhoto(photo: Photo) {
    this.photo.deletePhoto(photo).subscribe(
      data => {
        this.toastyService.success(this.setOptions('Success', 'Photo was successfully deleted!'));
        this.getPhotos(this.id);
      },
      err => this.toastyService.error(this.setOptions('Error', err))
    );
  }
  addPhoto(photo: Photo) {
    this.photo.addPhoto(photo).subscribe(
      () => {
        this.toastyService.success(this.setOptions('Success', 'Photo was successfully added!'));
        this.getPhotos(this.id);
      },
      err => this.toastyService.error(this.setOptions('Error', err))
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
