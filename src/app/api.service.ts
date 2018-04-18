import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  addUser(user) {
    // console.log(user);
    return this.http.post('http://localhost:3000/auth/register', user);
  }

  getUserId() {
    const token = localStorage.getItem('token');
    const jwtHelper: JwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(token)._id;
  }
  getTodos() {
    return this.http.get('http://localhost:3000/api/todos/' + this.getUserId());
  }

  saveToken(t) {
    localStorage.setItem('token', t);
  }

  checkToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const jwtHelper: JwtHelper = new JwtHelper();
      return !jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  getTodo(index) {
    return this.http.get('http://localhost:3000/api/todos/' + this.getUserId() + '/' + index);
  }
}
