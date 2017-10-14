import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {MessageService} from './message.service';
import {Message} from './message.model';


//the providers allows angular to create an instance of this service to be used in the private constructor below
//subscibe <== grabs the observable, 3 cases (success, error, complete)
@Component ({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {

  //represents the message loaded into the input field
  //by default is undefined (the field should start empty)
  //assigned by ngOnInit below
  message: Message;

  //creates a private instance of this service
  constructor(private messageService: MessageService) {}

  onSubmit(form: NgForm) {
    if(this.message) {
      //Editing

      //updates the message on the front end to equal the input value
      this.message.content = form.value.content;

      this.messageService.updateMessage(this.message)
          .subscribe(
            result => console.log(result)
          )

      //sets this object back to the default null so the form resets
      this.message = null;
    } else {
      //Creating
      const message = new Message(form.value.content, 'Mateo');
      this.messageService.addMessage(message)
          .subscribe(
            data => console.log(data),
            error => console.error(error)
          );
    }
    //stays outside since we want it to exucute in both cases
    form.resetForm();
  }

  onClear(form: NgForm) {
    this.message = null;
    form.resetForm();
  }

  //this OnInit is listening to eventemitter in message.component (sends the message back to the input)
  ngOnInit() {
    //informs the input component get informed whenever the edit button is clicked
    this.messageService.messageisEdited.subscribe(
        //what we do once the button is clicked
        //(for each message of type Message) => make the message uptop = to the message passed
        (message: Message) => this.message = message
    );
  }
}
