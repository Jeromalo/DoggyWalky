import * as React from "react";
import Stack from "@mui/material/Stack";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import "./Contacts.css";
import { Divider } from "@mui/material";
import {  alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AddIcon from '@mui/icons-material/Add';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Basile from '../components/img/basile.jpg';
import Yoan from '../components/img/Yoan.jpg';
import Borat from '../components/img/borat.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Contacts() {
  return (
    <div className="Contacts">
      
      <Button className="Container-Back-Contact" href="/homepage">
        <ArrowBackIosIcon className="Icon-Back-Contact"></ArrowBackIosIcon>
      </Button>
      <Card className="FormContacts" variant="outlined">
        <div className="ContainerContacts">
          <div className="Header-Logo-Contacts">
            <img src="./static/images/doggywalky.png" alt="logo" />
          </div>
          <div className="TitleSettings">
            <h1> Mes Contacts</h1>
          </div>
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
            <div className="Container-User-ContactProfil">
                <Card sx={{ maxWidth: 300, mt: '10px', mb: '20px' }}
                className="Card-User-ContactProfil">
                    <CardMedia
                    component="img"
                    // height="50"
                    image={Yoan}
                    alt="basile"
                    className="Card-ImageOfDog-ContactProfil"
                    />
                    <CardContent className="CardContent-ContactProfil">
                        <Typography gutterBottom variant="h5" component="div" className="FontChewy">
                            Yoan
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className="Container-User-ContactProfil">
                <Card sx={{ maxWidth: 300, mt: '10px', mb: '20px' }}
                className="Card-User-ContactProfil">
                    <CardMedia
                    component="img"
                    // height="50"
                    image={Borat}
                    alt="basile"
                    className="Card-ImageOfDog-ContactProfil"
                    />
                    <CardContent className="CardContent-ContactProfil">
                        <Typography gutterBottom variant="h5" component="div" className="FontChewy">
                            Borat
                        </Typography>
                    </CardContent>
                </Card>
            </div>
          <Stack direction="column" spacing={2}></Stack>
        </div>
      </Card>
    </div>
  );
}
