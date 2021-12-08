import React, { useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import MainNavbar from '../components/MainNavbar' 

export default function Message({user, userId}) {

    let roomInput = React.createRef();
    const socket = io('http://localhost:8080', {
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttempts: 10,
        transports: ['websocket'],
        agent: false,
        upgrade: false,
        rejectUnauthorized: false,
        query: {
            "id": userId
        }
    });

    socket.on('connect', () => {
        displayMessage(`You connected with id: ${socket.id}`);
    })
    
    socket.on('update', (message, sender) => {
        const fromMe = sender._id === userId;
        displayMessage(message, fromMe, sender);
    })

    socket.on('notify', room => {
        displayMessage(`joined ${room}`)
    }) 
   
    
    function handleSubmit(e) {
        const sender = user.loggedInUser

        e.preventDefault();
        const message = e.target.elements.messageInput.value;
        const room = e.target.elements.roomInput.value;
        
        if(message === "") return
        displayMessage(message, sender);

        socket.emit('send-msg', message, sender, room);   
    }

    function joinRoom(e) {
        e.preventDefault();
        const room = roomInput.current.value;
        socket.emit('join-room', room, userId);
    }

    function displayMessage(message, fromme = false, userSentMsg = {}) {
        const div = document.createElement("div");
        if(fromme) {
            div.textContent = `You: ${message}`;
        } else {
            div.textContent = `${!isEmpty(userSentMsg)? userSentMsg.username:'Someon'}: ${message}`;
        }
        document.getElementById('message-container').append(div)
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    return (
        <div>
            <MainNavbar />
            <div className="chatbox" style={{backgroundColor: '#ffffff'}}>
                <div id="message-container"></div>

                <form id="form" onSubmit={handleSubmit}>
                    <div>
                        <label for="message-input">Message</label>
                        <input type="text" name="messageInput"/>
                        <button type="submit" id="send-button">Send</button>
                    </div>
                    <div>
                        <label for="room-input">Room</label>
                        <input type="text" ref={roomInput} name="roomInput"/>
                        <button type="submit" onClick={joinRoom}>Join</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
