import React from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8080";

export const socket = io(ENDPOINT);
const SocketContext = React.createContext(socket);

export default SocketContext