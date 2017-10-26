//here we tell angular what the application consists of
//declarations: custom components, pipes, and other things used
//bootstrap: all the things the app consists of, what should be the root component?
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//unlocks http service in message.service
import {HttpModule} from '@angular/http';
import {MessageModule} from './messages/message.module';

import { AppComponent } from "./app.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {HeaderComponent} from "./header.component";
import {AuthService} from "./auth/auth.service";
import {ErrorComponent} from "./errors/error.component";
import {ErrorService} from "./errors/error.service";

import {routing} from './app.routing';

//the @NgModule is a decorator which is a ts feature that allow us to attach additional information to a class
@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        MessageModule
    ],
    //whatever is provided is available throughout the entire module(great place to create a single instance of an application-wide service)
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
