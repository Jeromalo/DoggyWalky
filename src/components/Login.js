import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
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
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const Input = styled("input")({
  display: "none",
});

export default function Login(props) {

  let navigate = useNavigate();

  const [loginForm, setloginForm] = useState({
    email: "",
    password: ""
  })

  useEffect(() => {
    console.log(loginForm.email)
    console.log(loginForm.password)
  }, [loginForm]);


  function logMeIn(event) {
    axios({
      method: "POST",
      url: "/token",
      data: {
        email: loginForm.email,
        password: loginForm.password
      }
    })
      .then((response) => {
        let result = response.data;
        console.log(result);
        console.log(response.data.message)
        console.log("access token :", response.data.access_token)
        if (response.data.message !== undefined) {
          props.setToken(response.data.access_token);
          localStorage.setItem('email', loginForm.email);
          navigate("/homepage", { replace: true })
        };
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
    setloginForm(({
      email: "",
      password: ""
    }))
    event.preventDefault()
  }

  function handleChange(event) {
    const { value, name } = event.target
    setloginForm(prevNote => ({
      ...prevNote, [name]: value
    })
    )
  }


  return (
    <div className="Login">
      <div className="ContainerLogin">
        <Card className="FormLogin" variant="outlined">
          <div className="HeaderLogo-Login">
            <img
              className="ImgLogo"
              src={doggywalky}
              alt="logo"
            />
          </div>
          <div className="LoginTitle">
            <h1>Connexion</h1>
          </div>
          <Box component="form" noValidate onSubmit={logMeIn} sx={{ mt: 3 }}>

            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                id="email"
                label="Indiquer votre adresse email"
                name="email"
                autoComplete="test"
                className="FormStyleLogin"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                name="password"
                label="Indiquer votre mot de passe"
                type="password"
                id="password"
                autoComplete="new-password"
                className="FormStyleLogin"
              />
            </Grid>
            <div className="LoginText">
              <a className="LoginText" href="/password">Mot de passe oublié ?</a>
            </div>
            <Stack direction="column" spacing={2}>
              <Button type="submit" className="ButtonLogin" variant="contained">
                Connexion
              </Button>

            </Stack>
            <div className="LoginText2">
              <a className="loginCompteText" href="/signup">Vous n'avez pas de compte ? <br></br> Inscrivez-vous</a>
            </div>
          </Box>
        </Card>
      </div>
    </div>
  );
}
