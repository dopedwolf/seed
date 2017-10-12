import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {MessageService} from './message.service';
import {Message} from './message.model';


//the providers allows angular to create an instance of this service to be used in the private constructor below
//subscibe <== grabs the observable, 3 cases (success, error, complete)
@Component ({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})
export class MessageInputComponent {
  constructor(private messageService: MessageService) {}
  onSubmit(form: NgForm) {
    const message = new Message(form.value.content, 'Mateo');
    this.messageService.addMessage(message)
        .subscribe(
          data => console.log(data),
          error => console.error(error)
        );
    form.resetForm();
  }
}
