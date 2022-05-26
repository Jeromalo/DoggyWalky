import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Box,
} from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import "./Chat.css";
import { TextField } from "@mui/material";
import { ListItemText, ListItem, ListItemIcon } from "@mui/material";
import { Divider } from "@mui/material";
import { Fab } from "@mui/material";
import { List } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { MessageSharp } from "@mui/icons-material";
import {useLocation} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";





const ENDPOINT = "http://localhost:5000/chat";

export default function Chat(props) {
  const [messages, setMessages] = useState(null);
  const [msg, setMsg] = useState(null);
  const [roomName, setRoomName] = useState(null);

  const socket = useRef(null);
  const messageRef = useRef();

  let location = useLocation();

  const navigate = useNavigate();


  useEffect(() => {
    //réceptions de messages par la socket
    //récupération des messages déjà existants
    console.log('room', location.state.room)

    if (location.state.room !== null && location.state.room !== undefined) {
      axios({
        method: "POST",//le POST n’est pas strictement nécessaire ici, utilisez GET si cela vous semble plus simple
        url: "/api/messagelist",
        data: { groupId: location.state.room },
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
        .then((response) => {
          console.log(response)
          setMessages(response.data.messages);//rappel : les données récupérées par axios() renvoient un objet "data" comportant les informations récupérées                  
          setRoomName(response.data.title)
          console.log(response.data.title)
        })

        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }
    return () => { socket.current.disconnect() }
  }, []);

  useEffect(() => {
    console.log(messages)
  }, [messages]);

  useEffect(()=>
  {
    console.log('location', location)
  }, [location.state.room])

  useEffect(() => {
    //connexion à la socket
    socket.current = io(ENDPOINT, {
      extraHeaders: {
        Authorization: "Bearer " + props.token,//token d'autorisation pour JWT
      },
    });
    socket.current.on("connect", () => {
      console.log("connected");
    });
    socket.current.emit("join", { groupId: location.state.room });
    socket.current.on("message", (data) => {//capte les messages renvoyés par le back-end
      console.log(data)
      setMessages((messages) => [...messages, data]);//ceci permet de récupérer les messages du state, et d’ajouter le dernier message reçu à la fin
    });
    console.log(ENDPOINT)
    console.log(props.token)
  }, [ENDPOINT, props.token]);//la socket ne sera initialisée que si l’ENDPOINT est créé

  const sendMessage = (event) => { //fonction d’envoi de message, à lier à un bouton d’envoi ainsi qu’un champ de formulaire
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('message'))
    console.log(location.state.room)
    // console.log(event.currentTarget)
    socket.current.emit("message sent", {//envoie un message au back-end
      message: data.get('message'),//value est à implémenter et à remplacer par le contenu de votre message
      groupId: location.state.room,
    });
    setMsg("")
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'instant',
          block: 'end',
          inline: 'nearest'
        })
    }
  })

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'instant',
          block: 'end',
          inline: 'nearest'
        })
    }
  },
  [msg])

  function toHomepage() {
    navigate("/homepage", { replace: true })
  }


  return (
    <div className="Chat">
    <Card variant="outlined">
    <Paper elevation={5}>
      <Grid container className="Container-Chat">

      <Grid item xs={12} md={12} className="Grid-NameContact-Chat">

      <ArrowBackIosIcon onClick={toHomepage}></ArrowBackIosIcon>

          <List>
              <ListItem button key="RemySharp">

                  <ListItemIcon>
                      {/* <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" /> */}
                  </ListItemIcon>

                  <ListItemText primary={roomName}>
                  </ListItemText>

              </ListItem>
          </List>

      <Divider />

      </Grid>


      <Grid item xs={12} md={12} className="Grid-ZoneChat-Chat">
          

          
          <List className="List-ZoneChat-Chat">

          {messages
           && messages !== null &&
           messages !== undefined &&
           messages.length > 0
          ?//on vérifie qu'il y a bien des message
          messages.map((message, index) => { return(
              <ListItem key={index} ref={messageRef}>
                  {/* <Paper elevation={3}> */}
                      <Grid container className={message.sender.email == localStorage.getItem('email') ?"Container-MessageTextRecipe-Chat" : "Container-MessageTextSend-Chat"}>

                          <Grid item xs={12} className="ListItem-ZoneName-Chat">
                              <ListItemText align={message.sender.email == localStorage.getItem('email') ? "right" : "left"} primary={message.sender.username}></ListItemText>
                          </Grid>

                          <Grid item xs={12}>
                              <ListItemText align={message.sender.email == localStorage.getItem('email') ? "right" : "left"} primary={message.content}></ListItemText>
                          </Grid>

                          <Grid item xs={12}>
                              <ListItemText align={message.sender.email == localStorage.getItem('email') ? "right" : "left"} secondary={message.timestamp}></ListItemText>
                          </Grid>
                      </Grid>
                  {/* </Paper> */}
                
              </ListItem>
              )
              }) : ''}

              

          
          </List>
      
      <Divider />
      <Box component="form" noValidate onSubmit={sendMessage} sx={{ mt: 3 }}> 
          <Grid container style={{padding: '5px 15px 10px 15px', backgroundColor:'white'}} className="Grid-EnterYourText-Chat">
              <Grid item xs={12} className="Grid-SuperFlex-Chat">
                  <TextField
                  id="message"
                  name="message"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  />
              <Fab type="submit" color="black" aria-label="add"><SendIcon></SendIcon></Fab>

              </Grid>

          </Grid>
          </Box >
      </Grid>
      </Grid>
      </Paper>
    </Card>
    </div>
  );
}
