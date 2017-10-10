//root component called in bootstrap array on app.module.ts
import { Component } from '@angular/core';

import {Message} from './messages/message.model';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
  message: Message = new Message ('some Message', 'Mateo');
}
