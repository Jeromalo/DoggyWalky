import io from "socket.io-client";
import { useEffect, useState} from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { ListItemText, ListItem, ListItemIcon } from "@mui/material";
import { Divider } from "@mui/material";
import { Fab } from "@mui/material";
import { List } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import {
Box,
} from "@mui/material";
import { yellow } from "@mui/material/colors";

const ENDPOINT = "http://localhost:5000/chat";

export default function Chat(props) {
const [messages, setMessages] = useState(null);
let socket = null;
useEffect(() => {
//connexion à la socket
socket = io(ENDPOINT, {
extraHeaders: {
Authorization: "Bearer " + props.token,//token d'autorisation pour JWT
},
});
socket.on("connect", () => {
console.log("connected");
});
socket.emit("join", { groupId: props.room });
socket.on("message", (data) => {//capte les messages renvoyés par le back-end
//...sera complété à l’étape d’après
});
}, [ENDPOINT]);//la socket ne sera initialisée que si l’ENDPOINT est créé
const sendMessage = (e) => {//fonction d’envoi de message, à lier à un bouton d’envoi ainsi qu’un champ de formulaire
socket.emit("message sent", {//envoie un message au back-end
message: "mon_message_est_un_hello_world",//value est à implémenter et à remplacer par le contenu de votre message
groupId: props.room,
});
};
return (
<div>
<Grid container>
<Grid item xs={12} >
<Typography variant="h5" className="header-message">Chat</Typography>
</Grid>
</Grid>
<Grid container component={Paper} className="">
<Grid item xs={3} className="">
<List>
<ListItem button key="RemySharp">
<ListItemIcon>
<Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
</ListItemIcon>
<ListItemText primary="John Wick"></ListItemText>
</ListItem>
</List>
<Divider />
<Grid item xs={12} style={{padding: '10px'}}>
<TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
</Grid>
<Divider />
<List>
<ListItem button key="RemySharp">
<ListItemIcon>
<Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
</ListItemIcon>
<ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
<ListItemText secondary="online" align="right"></ListItemText>
</ListItem>
<ListItem button key="Alice">
<ListItemIcon>
<Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
</ListItemIcon>
<ListItemText primary="Alice">Alice</ListItemText>
</ListItem>
<ListItem button key="CindyBaker">
<ListItemIcon>
<Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
</ListItemIcon>
<ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
</ListItem>
</List>
</Grid>
<Grid item xs={9}>
<List className="">
<ListItem key="1">
<Paper elevation={3}>
<Grid container>
<Grid>
<ListItemText align="right" primary="Name"></ListItemText>
</Grid>
<Grid item xs={12}>
<ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
</Grid>
<Grid item xs={12}>
<ListItemText align="right" secondary="09:30"></ListItemText>
</Grid>
</Grid>
</Paper>
</ListItem>
<ListItem key="2">
<Grid container>
<Grid item xs={12}>
<ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
</Grid>
<Grid item xs={12}>
<ListItemText align="left" secondary="09:31"></ListItemText>
</Grid>
</Grid>
</ListItem>
<ListItem key="3">
<Grid container>
<Grid item xs={12}>
<ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
</Grid>
<Grid item xs={12}>
<ListItemText align="right" secondary="10:30"></ListItemText>
</Grid>
</Grid>
</ListItem>
</List>
<Divider />
<Grid container style={{padding: '20px'}}>
<Grid item xs={11}>
<TextField id="outlined-basic-email" label="Type Something" fullWidth />
</Grid>
<Grid xs={1} align="right">
<Fab color="primary" aria-label="add"></Fab>
</Grid>
</Grid>
</Grid>
</Grid>
</div>
);
}
