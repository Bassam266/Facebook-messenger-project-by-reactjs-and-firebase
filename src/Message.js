import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './Message.css';

function Message({message,username}) {
const isUser = username === message.username

 return (
  

 <div className={`message ${isUser && 'message__card'}`}>
<Card className={isUser ? "message__userCard":"message__guestCard"} >
    <CardContent>
    <Typography color = "white" variant="h5" component="h2">
    {message.username || "unknown user"}:{message.message}
    </Typography>
   </CardContent>
   </Card>
 </div>
    












   
  
 )
}

export default Message
