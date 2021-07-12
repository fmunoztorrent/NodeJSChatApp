import ChatService from "../../../domain/ChatService";
import ChatUseCase from "../../../domain/ChatUseCase";

export default class setUserNameUseCase implements ChatUseCase{

    constructor (public _chatService:ChatService, public executeCallback:any){}

    excecute(payload:any) {

        let userNameSetted = this._chatService.EmmitMessage("setClientName", {
            name: payload.name
        });

        if(userNameSetted) {
            this.executeCallback(true);
            return true;
        } else {
            this.executeCallback(false)
            return false;
        }

    }

}