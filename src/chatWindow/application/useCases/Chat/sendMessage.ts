import ChatService from "../../../domain/ChatService";
import ChatUseCase from "../../../domain/ChatUseCase";


export default class sendMessageUseCase implements ChatUseCase{

    constructor (public _chatService:ChatService, public executeCallback:any){}

    excecute(payload:any):boolean {
        
        let sendMessage = this._chatService.EmmitMessage("message", {
            msg: payload.message
        });

        if(sendMessage) {
            
            this.executeCallback('')
            return true;

        } else {

            return false;
        }
    }

}