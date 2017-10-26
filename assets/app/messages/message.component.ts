import {Component, Input} from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';

@Component ({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [`
      .author {
        display: inline-block;
        font-style: italic;
        font-size: 12px;
        width: 80%;
      }
      .config {
        display: inline-block;
        text-align: right;
        font-size: 12px;
        width: 19%;
      }
    `]
})

//@Input makes it assignable from outside
//^(allows you to pass argument in <app-message>)
//The EventEmitter allows to create and listen to events
//the emit method creates a new event
//you can use any name for this type of binding
//the beginning tells message to follow the structure of Message
//@Output() editClicked = new EventEmitter<string>();
export class MessageComponent {
  @Input('inputMessage') message: Message;

  constructor(private messageService: MessageService) {}

  onEdit() {
    this.messageService.editMessage(this.message);
  }

  onDelete() {
      this.messageService.deleteMessage(this.message)
          .subscribe(
              result => console.log(result)
          );
  }
  belongsToUser() {
    return localStorage.getItem('userId') == this.message.userId;
  }

}
