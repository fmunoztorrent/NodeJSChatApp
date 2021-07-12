import React, { useState, useEffect } from "react";
import SocketContext from "./socket";

import IChatMessage from './chatWindow/domain/IChatMessage'

import SocketIOChatService from "./chatWindow/infrastructure/services/SocketIOChatService";
import sendMessageUseCase from "./chatWindow/application/useCases/Chat/sendMessage";
import setUserNameUseCase from "./chatWindow/application/useCases/Chat/setUserName";
import recieveMessageUseCase from "./chatWindow/application/useCases/Chat/recieveMessage";


function App() {

  

  const ChatMessages:Array<IChatMessage> = [];
  const initialUsers:Array<any> = [];

  // Socket ID
  const [clientId, setClientId] = useState("");
  
  // Message list
  const [messageList, setMessageList] = useState(ChatMessages);

  // Message recieved
  const [newMessage, setNewMessage] = useState("");

  // Client/Customes sending messages
  const [message, setMessage] = useState('')

  // Users Conected
  const [users, setUsers] = useState(initialUsers)


  // Conected client display name
  const [clientName, setClientName] = useState("")

  // Socket service responded with OK to store it's name
  const [userSetedClientName, setUserSetedClientName] = useState(false)

  // Socket singleton
  const socket = React.useContext(SocketContext);

  // Chat Service
  const chatService = new SocketIOChatService(socket);
  
  // Chat Use Cases
  const UCsendMessage =  new sendMessageUseCase(chatService, setNewMessage);
  const UCsetUserName = new setUserNameUseCase(chatService, setUserSetedClientName);
  /* const UCrecieveMessage = new recieveMessageUseCase(chatService, setMessageList); */

  useEffect(() => {

    socket.on("connection", socketID => {
      setClientId(socketID);
    })

  },[clientId])


  useEffect( () => {

    socket.on("message", data => {

      if(data.type === "messageList") {

        console.log("messageList", {data})
        setNewMessage(data.message)

      }


      if(data.type === "usersList") {

        let userList:any[] = [];

        for(const index in data["users"]) {
          userList.push(JSON.parse(data["users"][index]))
        }

        setUsers(userList);

      }

      if(data.type === "clientNameSetted"){
        console.log("Client name setted")
        setUserSetedClientName(true)
      }



    });

    /* socket.on("usersList", (data) => {
      
    }); */

    /* socket.on("clientNameSetted", data => {
      setUserSetedClientName(true)
    }); */

    return () => {
      console.log("Unmount component")
    }

  },[])
  



  useEffect( () => {

    if(newMessage!==""){
      let newMessageList:Array<IChatMessage> = [...messageList, {msg:newMessage}]
      setMessageList(newMessageList)
    }

  },[newMessage]);



  const sendMessage = () => {
    socket.emit("message", {message: message, type: "chat"});
    setMessage('');
  }



  
  const startChat = () => {

    /* const payload = {name:clientName};
    UCsetUserName.excecute(payload); */
    
    socket.emit("setClientName", {"name": clientName})
    setMessage('');
  }





  return (

      <div className="App">
        <h1>Chat app</h1>
        


        {!userSetedClientName && <>
        <input type="text" value={clientName} onChange={e=>setClientName(e.target.value)} />
        <button onClick={e => startChat()}>Empezar a chatear</button></>}
        
        
        {userSetedClientName && <ul>
          {messageList.map(msg => msg && <li>{msg.msg}</li>)}
        </ul>}


        {userSetedClientName && <input type="text" value={message} onChange={e=> setMessage(e.target.value)} />}
        {clientId && userSetedClientName && <button onClick={e=>sendMessage()}>Send message</button>}

        <h3>Users in chat</h3>
        <ul>
          {users && users.map( user => user && <li>{user.name}</li>)}
        </ul>


        <p>
          <small>Socket id {clientId}</small>
        </p>


      </div>

  );
}

export default App;
