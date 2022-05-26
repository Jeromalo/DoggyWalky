import React, { useState, useEffect } from "react";
import "./AddDog.css";
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


export default function AddDog (props) {
    return (
        <div className="AddDog">

{/* ---------- header ---------- */}

            <Button className="Container-Back-AddDog" href="/userprofil">
                <ArrowBackIosIcon className="Icon-Back-AddDog" ></ArrowBackIosIcon>
            </Button>

{/* ---------- container add dog ---------- */}

            <div className="ContainerAddDog">

                <Card className="Container-Form-AddDog"variant="outlined">

                    <div className="Header-Logo-AddDog">
                        <img src="./static/images/doggywalky.png" alt="logo" />
                    </div>

                    <div className="Title-AddADog">
                        <h1>Ajouter un chien</h1>
                    </div>

                    <Stack direction="column" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <AddIcon className="Icon-AddImg-AddDog"></AddIcon>
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
                    className="Input-FormStyle-AddDog"
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
                    className="Input-FormStyle-AddDog"
                    />
                    </Grid>

                    <Grid item xs={12} sm={3}>

                    <TextField
                    
                    fullWidth
                    id="dogGender"
                    label="Dog's Gender"
                    name="doggender"
                    autoComplete="test"
                    className="Input-FormStyle-AddDog"
                    />
                    </Grid>

                    <Grid item xs={12} sm={3}>


                    <TextField
                    
                    fullWidth
                    id="dogBreed"
                    label="Dog's Breed"
                    name="dogBreed"
                    autoComplete="test"
                    className="Input-FormStyle-AddDog"
                    />
                    </Grid>

                    <Stack direction="column" spacing={2}>
                        <Button className="Button-Add-AddDog" variant="contained">Ajouter</Button>
                    </Stack>
                </Card>

            </div>

        </div>
    );
}
