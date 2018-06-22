import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
  deleteUser(user: User): Observable<any> {
   return this.http.delete(`/api/user/${user.id}`, {responseType: 'text'})
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>('/api/user', user);
  }
}