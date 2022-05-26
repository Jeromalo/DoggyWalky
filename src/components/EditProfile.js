import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import Card from '@mui/material/Card';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const Input = styled('input')({
    display: 'none',
    });


export default function EditProfile () {
    return (

        <div className="EditProfile">

{/* ---------- header ---------- */}

            <Button className="Container-Back-EditProfile" href="/UserProfil">
                <ArrowBackIosIcon className="Icon-Back-EditProfile"></ArrowBackIosIcon>
            </Button>

{/* ---------- container modifier informations du profil ---------- */}

            <div className="ContainerEditProfile">

                <Card className="Container-Form-EditProfile" variant="outlined">

                    <div className="Header-Logo-EditProfile">
                        <img src="./static/images/doggywalky.png" alt="logo" />
                    </div>

                    <div className="Title-EditProfile">
                        <h1>Modifier mon profil</h1>
                    </div>

                    <Stack direction="column" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <AddIcon className="Icon-AddImg-EditProfile"></AddIcon>
                    </label>
                    <h6>Modifier ma photo de profil</h6>
                    </Stack>

                    <Grid item xs={12} sm={3}>
                        <TextField
                        required
                        fullWidth
                        id="dogName"
                        label="Pseudo"
                        name="dogname"
                        autoComplete="test"
                        className="Input-FormStyle-EditProfile"
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField
                        fullWidth
                        id="dogDescription"
                        label="Description"
                        name="dogdescription"
                        autoComplete="test"
                        className="FormStyleAddDog"
                        />
                    </Grid>

                    <Grid>
                        <TextField
                        required
                        fullWidth
                        id="dogGender"
                        label="Date d'anniversaire"
                        name="doggender"
                        autoComplete="test"
                        className="FormStyleAddDog"
                        />
                    </Grid>

                    <Grid item xs={6} sm={1}>
                        <TextField
                        required
                        fullWidth
                        id="dogBreed"
                        label="Ville"
                        name="dogBreed"
                        autoComplete="test"
                        className="FormStyleAddDog"
                        />
                    </Grid>

                    <Grid>
                        <TextField
                        required
                        fullWidth
                        id="dogBreed"
                        label="CP"
                        name="dogBreed"
                        autoComplete="test"
                        className="FormStyleAddDog"
                        />
                    </Grid>

                    <Stack direction="column" spacing={2}>
                        <Button className="Button-Maj-EditProfile" variant="contained">Ajouter</Button>
                    </Stack>

{/* ---------- modifier informations de log ---------- */}

                    <div className="Title-EditProfile">
                        <h1>Modifier mes informations de connexion</h1>
                    </div>

                    <Grid item xs={6} sm={1}>
                    <TextField
                    required
                    fullWidth
                    id="dogBreed"
                    label="Adresse e-mail"
                    name="dogBreed"
                    autoComplete="test"
                    className="FormStyleAddDog"
                    />
                    </Grid>

                    <Grid>
                    <TextField
                    required
                    fullWidth
                    id="dogBreed"
                    label="Mot de passe"
                    name="dogBreed"
                    autoComplete="test"
                    className="FormStyleAddDog"
                    />
                    </Grid>

                    <Stack direction="column" spacing={2}>
                        <Button className="Button-Maj-EditProfile" variant="contained">Enregistrer</Button>
                    </Stack>

                </Card>

            </div>

        </div>
    );
}
