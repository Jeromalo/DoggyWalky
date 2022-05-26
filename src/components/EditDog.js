import React, { useState, useEffect } from "react";
import "./EditDog.css";
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

export default function EditDog () {
    return (
        <div className="EditDog">

{/* ---------- header ---------- */}

            <Button className="Container-Back-EditDog" href="/UserProfil">
                <ArrowBackIosIcon className="Icon-Back-EditDog"></ArrowBackIosIcon>
            </Button>

{/* ---------- container modifier informations du profil du chiens ---------- */}

            <div className="ContainerAddDog">


                <Card className="Container-Form-EditDog"variant="outlined">

                    <div className="Header-Logo-EditDog">
                        <img src="./static/images/doggywalky.png" alt="logo" />
                    </div>

                    <div className="Title-EditDog">
                        <h1>Modifier les informations de mon chien</h1>
                    </div>

                    <Card className="Card-Form-EditDog" variant="outlined">

                    <Stack direction="column" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <AddIcon className="Icon-AddImg-EditDog"></AddIcon>
                    </label>
                    <h6>Ajouter la photo de votre chien</h6>
                    </Stack>


                    <Grid>

                    <TextField
                    required
                    fullWidth
                    id="dogName"
                    label="Indiquez le nom de votre chien"
                    name="dogname"
                    autoComplete="test"
                    className="Input-FormStyle-EditDog"
                    />
                    </Grid>

                    <Grid item xs={12} sm={3}>

                    <TextField
                    required
                    fullWidth
                    id="dogDescription"
                    label="Dog's Description"
                    name="dogdescription"
                    autoComplete="test"
                    className="Input-FormStyle-EditDog"
                    />
                    </Grid>

                    <Grid item xs={12} sm={3}>

                    <TextField
                    fullWidth
                    id="dogGender"
                    label="Dog's Gender"
                    name="doggender"
                    autoComplete="test"
                    className="Input-FormStyle-EditDog"
                    />
                    </Grid>

                    <Grid item xs={12} sm={3}>


                    <TextField
                    
                    fullWidth
                    id="dogBreed"
                    label="Dog's Breed"
                    name="dogBreed"
                    autoComplete="test"
                    className="Input-FormStyle-EditDog"
                    />
                    </Grid>

                    <Stack direction="column" spacing={2}>
                        <Button className="Button-Maj-EditDog" variant="contained">Modifier</Button>
                    </Stack>

                    </Card>

                </Card>

            </div>

        </div>
    );
}
