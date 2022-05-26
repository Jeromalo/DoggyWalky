import React, { useState, useEffect } from "react";
import "./UserProfil.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Typography from '@mui/material/Typography';
import Basile from '../components/images/basile.jpg';
import WonderWoman from '../components/images/wonderwoman.jpg'
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function UserProfil (props) {

    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(null);
  
    useEffect(() => {
      getData();
    }, [])
  
    function getData() {
     axios({
       method: "GET",
       url:"/api/profile",
       headers: {
         Authorization: 'Bearer ' + props.token
       }
    })
    .then((response) => {
      const res =response.data
      setProfileData({
        my_nickname: res.firstname,
        my_birthdate: res.lastname,
        my_email: res.email,
        my_description: res.description,
        my_dogs: res.dogs,
        })
        console.log(res.dogs)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}


    function toHomepage() {
        navigate("/homepage", { replace: true })
    }

    return (
        <div className="UserProfil">

            {/* ---------- header ---------- */}

            <div className="Container-BackAndProfil-UserProfil">
            {/* <Button className="Container-Back-AddDog" href="/homepage"> */}
                <ArrowBackIosIcon onClick={toHomepage}></ArrowBackIosIcon>
            {/* </Button> */}
                <Typography className="Typo-Myprofil-UserProfil">My Profile</Typography>
            </div>

            {/* ---------- container profil des animaux ---------- */}

            <div className="Container-DogsUserProfil">

                <div className="Container-UsersDogs-UserProfil">
                    {profileData && profileData !== null &&
                    profileData !== undefined
                    && profileData.my_dogs.map((dog, index) =>

                    <Card key={index} sx={{ maxWidth: 125 }}
                    className="Card-ProfilDog-UserProfil">
                        <CardMedia
                        className="Image-UserProfil"
                        component="img"
                        image={require("./images/"+ dog.picturepath)}
                        alt="basile"
                        />
                        <CardContent className="CardContent-UserProfil">
                            <Typography gutterBottom variant="h5" component="div" className="FontChewy">
                            {dog.dogname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {dog.breed}
                            </Typography>
                        </CardContent>
                    </Card>)}

                </div>

                <div className="NavDogsUser-UserProfil">
                    <Button variant="contained" href="/adddog" className="Button-AddDog-UserProfil">
                        <span>Ajouter un chien</span>
                    </Button>
                    <Button href="/EditDog">
                        <SettingsIcon className="Button-Settings-UserProfil"></SettingsIcon>
                    </Button>
                </div>

            </div>

            {/* ---------- container profil utilisateur---------- */}

            <div className="Container-User-UserProfil">
                <Card sx={{ maxWidth: 365 }}
                className="Card-User-UserProfil">
                    <CardMedia
                    component="img"
                    // height="50"
                    image={WonderWoman}
                    alt="basile"
                    className="Image-UserProfil"
                    />
                    {profileData && <CardContent className="CardContent-UserProfil">
                        <Typography gutterBottom variant="h5" component="div">
                            {profileData.my_nickname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {profileData.my_description}
                        </Typography>
                    </CardContent>}

                    <div className="Container-LocSettings-UserProfil">
                        <span className="Localisation-UserProfil">
                            <LocationOnIcon></LocationOnIcon>Paris 10°
                        </span>

                        <Button href="/EditProfile">
                            <SettingsIcon className="Button-Settings-UserProfil"></SettingsIcon>
                        </Button>

                    </div>
            </Card>

            </div>

        </div>
    );
}
