import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx';

import {User} from './user.model';
import {Observable} from 'rxjs';

@Injectable()

//map() transforms the data we get back, to make map work we need to unlock the operators by imports rxjs which gives access to map and all other operators
export class AuthService {
  constructor(private http: Http) {}
  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});

    //this connects to the post route just created
    return this.http.post("http://localhost:3000/user", body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Reponse) => Observable.throw(error.json()));
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});

    //this connects to the post route just created
    return this.http.post("http://localhost:3000/user/signin", body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Reponse) => Observable.throw(error.json()));
  }

  //erases the token that is saved
  logout(){
    localStorage.clear();
  }

  //returns true or false
  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
