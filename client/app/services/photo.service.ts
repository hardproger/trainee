import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Photo } from '../models/photo';

@Injectable()
export class PhotoService {
  constructor(private http: HttpClient) {}
  getPhotos(userId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`/api/photos/${userId}`);
  }
  getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`/api/photo/${id}`);
  }
  deletePhoto(photo: Photo): Observable<any> {
    return this.http.delete(`/api/photo/${photo.id}`,{responseType: 'text'});
  }
  editPhoto(photo: Photo): Observable<any> {
    return this.http.put(`/api/photo/${photo.id}`, photo,{responseType: 'text'});
  }
  addPhoto(photo: Photo): Observable<Photo> {
    return this.http.post('/api/photo', photo);
  }
}
