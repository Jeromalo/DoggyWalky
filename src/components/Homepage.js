import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import {  alpha } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PetsIcon from '@mui/icons-material/Pets';



    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        },
    }));



export default function Homepage (props) {

    let navigate = useNavigate();

    const [conversations, setConversations] = useState()

    useEffect(() => {
        axios({
        method: "POST",
        url: "/homepage",
        headers: {
            Authorization: "Bearer " + props.token,
        },
        })
        .then((response) => {
            console.log(response)
            const data = response.data.conversations
            setConversations(data)
            console.log("data", data)
        })

        .catch((error) => {
            if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
        });
    }
    , []);

    useEffect(() => {
        console.log("======>", conversations)
      }, [conversations]);


    return (
        <div className="Homepage">

{/* ---------- header ---------- */}

            <div className="NavBar-LogoProfil-Homepage">
                <img src="./static/images/doggywalky.png" className="Logo-Homepage" alt="Logo de Doggy Walky"/>
                <Button href="/userprofil">
                    <Avatar alt="X" src="/static/images/avatar/1.jpg" className="Button-AvatarProfilUser-Homepage"  />
                </Button>
            </div>

{/* ---------- container homepage ---------- */}



                {/* <Card className="Container-Homepage" variant="outlined"> */}


                {/* </Card> */}


            <div className="Shadow-Homepage">

                <Box sx={{ flexGrow: 1 }}>  
                    <Search className="Box-Search-Homepage">
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        className="StyledInputBase-SearchConversation-Homepage"
                        />
                        <AddIcon className="Button-CreationGroup-Homepage"/>
                    </Search>
                </Box>

                <Divider/>


                <div className="Container-Test-Homepage">
                <Typography className="Typo-ListConv-Homepage">Conversations</Typography>
                <List sx={{ width: '100%', maxWidth: '325px', bgcolor: 'background.paper' }}>
                {/* className="List-AllConversations-Homepage" */}

                {conversations
           && conversations !== null &&
           conversations !== undefined
          ?
          conversations.map((conversation, index) => { return(
                    <Link to="/chat" state={{room:conversation.id}}>
                    <ListItem alignItems="flex-center" className="ListItem-Conversation-Homepage" key={index}>
                        <ListItemAvatar>
                        <Avatar alt={conversation.content} src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                        className="ListItemText-NameGroup-Homepage"
                        primary={conversation.content}
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {/* Ali Connors */}
                            </Typography>
                            {/* {conversation.content} */}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    </Link>
                    )
                    }) : ''}

                </List>
                </div>

            </div>


            <div className="Container-FooterBar-Homepage">

            <Button href="/Contacts">
                <ContactPageIcon className="Button-Contacts-Homepage"></ContactPageIcon>
            </Button>


            <Button  href="/DogWalk">
                    <PetsIcon className="Button-LetsWalk" alt="Boutton Partons en balade"></PetsIcon>
            </Button>

            <Button href="/Logout">
                <ExitToAppIcon className="Button-Exit-Homepage"></ExitToAppIcon>
            </Button>

            </div>



        </div>
    );
}
