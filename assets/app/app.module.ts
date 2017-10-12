//here we tell angular what the application consists of
//declarations: custom components, pipes, and other things used
//bootstrap: all the things the app consists of, what should be the root component?
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//unlocks http service in message.service
import {HttpModule} from '@angular/http';

import { AppComponent } from "./app.component";
import {MessageComponent} from "./messages/message.component";
import {MessageListComponent} from "./messages/messageList.component";
import {MessageInputComponent} from "./messages/messageInput.component";
import {MessagesComponent} from "./messages/messages.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {HeaderComponent} from "./header.component";
import {LogoutComponent} from "./auth/logout.component";
import {SignUpComponent} from "./auth/signup.component";
import {SignInComponent} from "./auth/signin.component";


import {routing} from './app.routing';

//the @NgModule is a decorator which is a ts feature that allow us to attach additional information to a class
@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignUpComponent,
        SignInComponent
    ],
    imports: [BrowserModule, FormsModule, routing, ReactiveFormsModule, HttpModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
