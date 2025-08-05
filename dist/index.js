import { WebSocketServer, WebSocket } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
let allSockets = []; //arry where all client that will be connected to this server will store.
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            console.log("user joined the room " + parsedMessage.payload.roomid);
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomid,
            });
        }
        if (parsedMessage.type === "chat") {
            console.log("user wants to chat");
            let currentUserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i]?.socket == socket) {
                    currentUserRoom = allSockets[i]?.room;
                }
            }
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i]?.room == currentUserRoom) {
                    allSockets[i]?.socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});
//# sourceMappingURL=index.js.map