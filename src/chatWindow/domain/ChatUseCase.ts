import ChatService from "./ChatService";

interface IChatService {
    _chatService:ChatService
}

export default abstract class ChatUseCase  implements IChatService{
    
    constructor(public _chatService:ChatService, public executeCallback:any) {}
    abstract excecute(payload:object):boolean

}