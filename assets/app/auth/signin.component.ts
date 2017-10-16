import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from './user.model';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component ({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html'
})

export class SignInComponent {
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router){}

  //.subscribe() tells us what to do with the returning data
  //localStorage is a browser storage for data (persists)
  //this.router.navigateByUrl('/'); ==> Navigates to proposed route using the Router from angular
  onSubmit() {
    const user = new User(this.myForm.value.email, this.myForm.value.password);
    this.authService.signin(user)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          this.router.navigateByUrl('/');
        },
        error => console.error(error)
      );
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required)
    });
  }
}
