//root component called in bootstrap array on app.module.ts
import { Component } from '@angular/core';
import {MessageService} from './messages/message.service';

//placing the MessageService here in the providers allows for single instance of the service
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent {

}
