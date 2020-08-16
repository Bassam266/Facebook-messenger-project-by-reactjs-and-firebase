import React , {useState, useEffect}  from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { FormControl, InputLabel, Input, FormHelperText, } from '@material-ui/core';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase'
import logo from './logo/logo1.webp'
import SendIcon from '@material-ui/icons/Send';
import { IconButton ,} from '@material-ui/core';

function App() {
 const [input, setInput] = useState("")
 const [messages, setMessages] = useState([{username:'Bassam',message:'hi'},{username:'Ali',message:'hello'}])
 const [username , setUsername] = useState('');



useEffect(() => {
 setUsername(prompt('please enter your name'))
}, [])

//database
useEffect(() => {
  db.collection("messages").orderBy("timestamp","desc").onSnapshot(snapshot => {
    setMessages(snapshot.docs.map(doc => doc.data()))

  })
    
  }, [])
const sendMessage = (event) => {
db.collection('messages').add({
  message: input,
  username: username,
  timestamp:firebase.firestore.FieldValue.serverTimestamp(),
})


setMessages([...messages, {username: username, message:input}])
setInput("")
event.preventDefault();

}

  return (
    <div className="App">
      <img src={logo} alt="Logo" width="100" length="100" />
    <h2> Example Of Facebook Messanger Project </h2>

<form className="app__form">
    <FormControl className="app__formControl">
    
    <Input className="app__Input" placeholder = "Enter the message ..." value={input} onChange={event =>setInput(event.target.value)} />
    <IconButton className="app__IconButto" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
                <SendIcon />
        </IconButton>
    
    <FormHelperText></FormHelperText>
    </FormControl>
</form>


     {
       messages.map(message => (
         <Message username={username} message={message}/>
       
       ) ) 
     }
    </div>
  );
}

export default App;
