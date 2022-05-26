import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from 'react';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import './Login.css'

function Login(props) {

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
       url:"/token",
       data:{
         email: loginForm.email,
         password: loginForm.password
        }
     })
     .then((response) => {
      let result = response.data;
      console.log(result);
      console.log(response.data.message)
      console.log("access token :", response.data.access_token)
      if (response.data.message !== undefined){
      props.setToken(response.data.access_token);
      navigate("/api/profile", { replace: true })
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
        password: ""}))
      event.preventDefault()
    }

    function handleChange(event) {
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
        <>      
      <Box
          sx={{
              my: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }}>
          <Typography variant="h4"> Sign In </Typography>
          <form className="login" onSubmit={logMeIn} >
                <TextField
                    onChange={handleChange}
                    value={loginForm.email}
                    text={loginForm.email}
                    label="Email Address"
                    required
                    id="email"
                    name="email"
                    margin="normal"
                />
                <TextField
                    onChange={handleChange}
                    value={loginForm.password}
                    text={loginForm.password}
                    label="Password"
                    required
                    id="password"
                    name="password"
                    type="password"
                    margin="normal"
                />
                {/* <Link
                    href="forgetpassword"
                    sx={{ mr: 12, mb: 2 }}
                >
                    forget password?
                </Link> */}
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Sign In
                </Button>
          </form>
      </Box>
  </>
    );
 }
 export default Login;
