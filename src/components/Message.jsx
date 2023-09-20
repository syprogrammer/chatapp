import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({ message }) => {
  const {currentUser}= useContext(AuthContext)
  const {data} = useContext(ChatContext)

  
  console.log("message", message)
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src="./avatar.png" />
        <span>just now</span>

      </div>
      <div className="messageContent">
        <p>hello</p>
      </div>
    </div>
  )
}

export default Message