import React, { useState, useEffect } from "react";
import "./DogWalk.css";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Basile from '../components/img/basile.jpg';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import AlarmIcon from '@mui/icons-material/Alarm';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from '@mui/material/Typography';



    // export default function CheckboxListSecondary() {
    //     const [checked, setChecked] = React.useState([1]);
    
    //     const handleToggle = (value) => () => {
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];
    
    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }
    
    //     setChecked(newChecked);
    //     };
    
    //     return (
    //     <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    //         {[0, 1, 2, 3].map((value) => {
    //         const labelId = `checkbox-list-secondary-label-${value}`;


const Input = styled('input')({
    display: 'none',
    });

    function valuetext(value) {
        return `${value}°C`;
    }


export default function AddDog () {
    return (
        <div className="DogWalk">



                <Card className="Card-App-DogWalk" variant="outlined">

{/* ---------- header ---------- */}

                    <Button className="Container-Back-DogWalk" href='/Homepage'>
                    <ArrowBackIosIcon className="Icon-Back-DogWalk"></ArrowBackIosIcon>
                    <Typography className="Typo-Myprofil-DogWalk">Partons en balade</Typography>
                    {/* .map name du contact */}
                    </Button>

{/* ---------- container dog walk ---------- */}


                    <Card className="LittleCard-DogWalk">
                        <h1 className="TitleLittleCard-DogWalk">Qui part en balade ?</h1>
                        <CardMedia
                        component="img"
                        image={Basile}
                        alt="basile"
                        className="CardMedia-ImgDogUser-DogWalk"
                        />
                    </Card>

                    <Card className="LittleCard-DogWalk">
                        <h1 className="TitleLittleCard-DogWalk">Avec qui?</h1>

                        <ListItem
                        className="ListItem-Contact-DogWalk">

                            <ListItemButton>

                                <ListItemAvatar>

                                    <Avatar
                                    // alt={`Avatar n°${value + 1}`}
                                    // src={`/static/images/avatar/${value + 1}.jpg`}
                                    />
                                </ListItemAvatar>

                                <ListItemText>Maurice</ListItemText>
                                {/* <ListItemText id={labelId} primary={`Line item ${value + 1}`} /> */}
                            
                            </ListItemButton>

                            <Checkbox
                            edge="end"
                            // onChange={handleToggle(value)}
                            // checked={checked.indexOf(value) !== -1}
                            // inputProps={{ 'aria-labelledby': labelId }}
                            />

                        </ListItem>
    
                    </Card>


                    <Card className="LittleCard-DogWalk">
                        <h1 className="TitleLittleCard-DogWalk ">Pendant combien de temps ?</h1>
                        <Box className="Box-Timing-DogWalk">
                            <AlarmIcon className="AlarmIcon-DogWalk"></AlarmIcon>  
                            <Box sx={{ width: 250 }}>
                                <Slider
                                aria-label="Temperature"
                                defaultValue={5}
                                getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={5}
                                max={60}
                                className="Timer-DogWalk"
                                />
                                {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
                            </Box>
                        </Box>
                    </Card>

                    <div className="Div-Button-LetsWalk-DogWalk">
                        <Button className="Button-LetsWalk-DogWalk" variant="contained">Let's Walk</Button>
                    </div>

                </Card>

            </div>


    );
}
