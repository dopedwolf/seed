import {NgModule} from '@angular/core';

//includes directives like ngFor and so on
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';

import {MessagesComponent} from './messages.component';
import {MessageListComponent} from './messageList.component';
import {MessageComponent} from './message.component';
import {MessageInputComponent} from './messageInput.component';

import {MessageService} from './message.service';

@NgModule({
  declarations: [
    MessagesComponent,
    MessageListComponent,
    MessageComponent,
    MessageInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [MessageService]
})

export class MessageModule {

}
