import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {Message} from "./message.model";

import {ErrorService} from "../errors/error.service";

//does nothing behind the scenes but add meta data to allow injection of service(http)
@Injectable()

//this.http.post("http://localhost:3000/message", body); <-- sets up an 'observable', which holds the request but does not send it
//.map((response: Response) => response.json()); <-- maps the data from response. the .json() func allows you to extract data attached to response and converts it to a js object
//error.json attaches only the data to the error response
//new EventEmitter<Message>(); emits a new message object on event
export class MessageService {
  private messages: Message[] = [];

  //this emits an ovject of type Message for use in the input of message component
  messageisEdited = new EventEmitter<Message>();

  //Inject HttpClient into your component or service.
  constructor(private http: Http, private errorService: ErrorService) {}

  addMessage(message: Message) {
    // this.messages.push(message);
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    //apends the token for later use in the req.query.token
    const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.post("https://messenger-ajs2.herokuapp.com/message" + token, body, {headers: headers})
        .map((response: Response) => {
          const result = response.json();
          const message = new Message(
            result.obj.content,
            result.obj.user.firstName,
            result.obj._id,
            result.obj.user._id
          );
          this.messages.push(message);
          return message;
        })
        .catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
  }
  getMessages() {
    return this.http.get('https://messenger-ajs2.herokuapp.com/message')
        .map((response: Response) => {
            const messages = response.json().obj;
            let transformedMessages: Message[] = [];
            for (let message of messages) {
              transformedMessages.push(new Message(
                message.content,
                message.user.firstName,
                message._id,
                message.user._id)
              );
            }
            this.messages = transformedMessages;
            return transformedMessages;
        })
        .catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
  }

  updateMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    //apends the token for later use in the req.query.token
    const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.patch("https://messenger-ajs2.herokuapp.com/message/" + message.messageId + token, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
  }
  editMessage(message: Message) {
    //emits the message we want to the event emitter
    this.messageisEdited.emit(message);
  }
  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    //apends the token for later use in the req.query.token
    const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.delete("https://messenger-ajs2.herokuapp.com/message/" + message.messageId + token)
        .map((response: Response) => response.json())
        .catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
  }
}
