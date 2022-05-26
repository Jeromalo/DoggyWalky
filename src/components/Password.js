import React, { useState, useEffect } from "react";
import "./Password.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import doggywalky from "../components/images/doggywalky.png"


const Input = styled("input")({
  display: "none",
});
export default function Password() {
  return (
    <div className="Password">
      <div className="ContainerPassword">
          <Button className="ButtonReturn" href="/">
        <ArrowBackIosIcon style={{color:"black"}} ></ArrowBackIosIcon>
      </Button>
        <Card className="FormPassword" variant="outlined">
        <div className="HeaderLogo-password">
          <img
            className="ImgLogo"
            src={doggywalky}
            alt="logo"
          />
        </div>
          <div className="PasswordTitle">
            <h1>Des difficultés de Connexion ?</h1>
          </div>
          <div className="PasswordText">
            <h3>Entrez votre e-mail et nous vous enverrons un lien pour récupérer votre compte.</h3>
          </div>
         
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Indiquer votre adresse email"
              name="email"
              autoComplete="test"
              className="FormStylePassword"
            />
          </Grid>
          <Stack direction="column" spacing={2}>
            <Button className="ButtonPassword" variant="contained">
              Envoyer
            </Button>
          </Stack>
        </Card>
      </div>
    </div>
  );
}
