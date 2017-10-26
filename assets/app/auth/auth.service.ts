import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx';

import {User} from './user.model';
import {Observable} from 'rxjs';

import {ErrorService} from '../errors/error.service';

@Injectable()

//map() transforms the data we get back, to make map work we need to unlock the operators by imports rxjs which gives access to map and all other operators
export class AuthService {
  constructor(private http: Http, private errorService: ErrorService) {}
  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});

    //this connects to the post route just created
    return this.http.post("https://messenger-ajs2.herokuapp.com/user", body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});

    //this connects to the post route just created
    return this.http.post("https://messenger-ajs2.herokuapp.com/signin", body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
