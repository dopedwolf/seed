import {Component} from '@angular/core';
<<<<<<< HEAD
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
=======
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
>>>>>>> 3083340a43e7f5bd7393fe01a7de8cd5a3e87711

@Component ({
    selector: 'app-logout',
    template: `
      <div class="col-md-8 col-md-offset-2">
        <button class="btn btn-danger" (click)="onLogout()">Logout</button>
      </div>
    `
})

export class LogoutComponent {

  constructor(private authService: AuthService, private router: Router){}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'signin']);
  }
}
