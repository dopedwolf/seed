//adding a ? makes them optional
export class User {
  constructor(
    public email: string,
    public password: string,
    public firstName?: string,
    public lastName?: string,
  ){}
}

//same as above just longer
// export class Message {
//   content: string;
//   username: string;
//   messageId: string;
//   userId: string;
//
//   constructor(
//     content: string,
//     username: string,
//     messageId: string,
//     userId: string,
//   ) {
//     this.content = content;
//     this.username = username;
//     this.messageId = messageId;
//     this.userId = userId;
//   }
// }
