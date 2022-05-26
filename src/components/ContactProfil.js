import React, { useState, useEffect } from "react";
import "./ContactProfil.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Typography from '@mui/material/Typography';
import Basile from '../components/img/basile.jpg';


export default function ContactProfil () {
    return (
        <div className="ContactProfil">

{/* ---------- header ---------- */}

            <div className="Container-Back-ContactProfil">
                <ArrowBackIosIcon className="Icon-Back-ContactProfil"></ArrowBackIosIcon>
                <Typography className="Typo-Myprofil-ContactProfil">Profil de Maurice</Typography>
                {/* .map name du contact */}
            </div>


{/* ---------- container de(s) chien(s) du contact ---------- */}


            <div className="Container-DogsContactProfil">
                <div className="ContainerCard-ContactDogs-ContactProfil">
                    <Card sx={{ maxWidth: 125 }}
                    className="Card-ProfilDog-ContactProfil">
                        <CardMedia
                        component="img"
                        // height="50"
                        image={Basile}
                        alt="basile"
                        className="Card-ImageOfDog-ContactProfil"
                        />
                        <CardContent className="CardContent-ContactProfil">
                            <Typography gutterBottom variant="h5" component="div" className="FontChewy">
                                Basile
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Carlin
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>


{/* ---------- container du profil du contact ---------- */}


            <div className="Container-User-ContactProfil">
                <Card sx={{ maxWidth: 365 }}
                className="Card-User-ContactProfil">
                    <CardMedia
                    component="img"
                    // height="50"
                    image={Basile}
                    alt="basile"
                    className="Card-ImageOfDog-ContactProfil"
                    />
                    <CardContent className="CardContent-ContactProfil">
                        <Typography gutterBottom variant="h5" component="div" className="FontChewy">
                            Obi Wan
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Mon chien, Basile, adore se rouler dans l'herbe et manger les chaussures de Catherine.
                        </Typography>
                    </CardContent>

                    <div className="Container-LocSettings-ContactProfil">
                        <span className="Localisation-ContactProfil">
                            <LocationOnIcon></LocationOnIcon>Paris 10°
                        </span>
                    </div>
                </Card>
            </div>

        </div>
    );
}
