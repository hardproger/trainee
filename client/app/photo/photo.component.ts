import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})

export class PhotoComponent {
  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/upload'});
  constructor(private route: ActivatedRoute) {
    this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => {
      console.log(res);
    };
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
}
