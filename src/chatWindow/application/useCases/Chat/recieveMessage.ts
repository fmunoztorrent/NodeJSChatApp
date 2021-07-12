import ChatService from "../../../domain/ChatService";
import ChatUseCase from "../../../domain/ChatUseCase";

export default class recieveMessageUseCase implements ChatUseCase{

    constructor (public _chatService:ChatService, public executeCallback:any){}

    excecute(payload:object) {
        return true
    }
}