import {Routes, RouterModule} from "@angular/router"

import {MessagesComponent} from './messages/messages.component';
import {AuthenticationComponent} from './auth/authentication.component';
import { AUTH_ROUTES } from './auth/auth.routes';

//the children property takes an array. AUTH_ROUTES is already an array of routes
//pathMatch allows angular to always redirect to messages regardles of the input. (always redirects to messages when at the root path)
const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessagesComponent },
  { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

//registers the routes in angular
//it needs to be reexported since the main one comes with no routes
//routes here will get loaded in the uppermost <router-outlet>
export const routing = RouterModule.forRoot(APP_ROUTES);
