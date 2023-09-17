import React from 'react'
import Messages from './Messages'
import Input from './Input'

const Chat = () => {
    return (
        <div className="chat">
            <div className="chatInfo">
                <span></span>
                <div className="chatIcons">
                    <img src="./camera.png" alt="icon" />
                    <img src="./more.png" alt="icon" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat