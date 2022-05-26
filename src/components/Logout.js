import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from 'react';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import './Login.css'

function Logout(props) {

  const navigate = useNavigate();

   useEffect(() => {

     axios({
       method: "POST",
       url:"/api/logout",
       data:{
        }
     })
     .then((response) => {
      props.removeToken();
      let result = response.data;
      console.log("Token retiré du localstorage");
      navigate("/", { replace: true });
     }).catch((error) => {
       if (error.response) {
         console.log("ERR")  
         console.log(error.response)
         console.log(error.response.status)
         console.log(error.response.headers)
         }
     })
    }, []);

    return (
        <>
        <div style={{marginTop: "250px", marginBottom: "250px"}}>
        <Typography variant="h2" component="div" sx={{marginTop:'-30px'}}>Vous êtes bien déconnecté !</Typography>
        </div>
  </>
    );
 }
 export default Logout;
