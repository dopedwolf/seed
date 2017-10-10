//here we tell angular what the application consists of
//declarations: custom components, pipes, and other things used
//bootstrap: all the things the app consists of, what should be the root component?
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { AppComponent } from "./app.component";
import {MessageComponent} from "./messages/message.component";

//the @NgModule is a decorator which is a ts feature that allow us to attach additional information to a class
@NgModule({
    declarations: [
        AppComponent,
        MessageComponent
    ],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
