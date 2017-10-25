import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {Message} from "./message.model";

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
  constructor(private http: Http) {}

  addMessage(message: Message) {
    // this.messages.push(message);
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    //apends the token for later use in the req.query.token
    const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.post("http://localhost:3000/message" + token, body, {headers: headers})
        .map((response: Response) => {
          const result = response.json();
          const message = new Message(result.obj.content, "dummy", result.obj._id, null);
          this.messages.push(message);
          return message;
        })
        .catch((error: Response) => Observable.throw(error.json()));
  }
  getMessages() {
    return this.http.get('http://localhost:3000/message')
        .map((response: Response) => {
            const messages = response.json().obj;
            let transformedMessages: Message[] = [];
            for (let message of messages) {
              transformedMessages.push(new Message(message.content, 'Dummy', message._id, null))
            }
            this.messages = transformedMessages;
            return transformedMessages;
        })
        .catch((error: Response) => Observable.throw(error.json()));
  }
  updateMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    //apends the token for later use in the req.query.token
    const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.patch("http://localhost:3000/message/" + message.messageId + token, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
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
    return this.http.delete("http://localhost:3000/message/" + message.messageId + token)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
  }
}
