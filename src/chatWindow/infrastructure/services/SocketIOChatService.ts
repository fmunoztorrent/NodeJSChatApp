import ChatService from "../../domain/ChatService";
import IChatMessage from "../../domain/IChatMessage";

export default class SocketIOChatService implements ChatService{

    
    private socket
    private clientID:string
    public messageList:IChatMessage[] = [];


    constructor(socket:any){
        this.socket = socket;
        this.clientID = '';
    }

    
    ClientId():string {
        return this.clientID;
    }
    

    EmmitMessage(event:string, payload:any){

        let send = this.socket.emit(event, payload);
        if(send){
            return true; 
        } else {
            return false; 
        }
    }

    
    AppendChatMessage(msg:IChatMessage){
        this.messageList.push(msg);
    }


    GetChatMessages(){
        return this.messageList;
    }


}