export default abstract class ChatService {

    abstract EmmitMessage(event: string, payload:any):boolean

}