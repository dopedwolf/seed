import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {authRouting} from './auth.routing';

import {SignInComponent} from './signin.component';
import {SignUpComponent} from './signup.component';
import {LogoutComponent} from './logout.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    authRouting
  ]
})

export class AuthModule {

}
