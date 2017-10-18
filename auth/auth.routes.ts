import {Routes} from '@angular/router';

import {SignUpComponent} from './signup.component';
import {SignInComponent} from './signin.component';
import {LogoutComponent} from './logout.component';


//the path here is relative to the 'auth' route. ex: auth/signup instead of just /signup
export const AUTH_ROUTES: Routes = [
  {path: '', redirectTo: 'signup', pathMatch: 'full'},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'logout', component: LogoutComponent}
];
