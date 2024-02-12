import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Container, Grid, Link as MuiLink, Box } from "@mui/material";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      }
      else {
        setAuth(false)
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("https://c0.wallpaperflare.com/preview/753/601/103/black-green-leaves-plants.jpg")',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 4,
            borderRadius: 1
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Let's Get Started
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            Create your account
          </Typography>
          <Box component="form" onSubmit={onSubmitForm} sx={{ mt: 1 }}>          
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Your Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={onChange}
              sx={{ input: { color: 'white' }, label: { color: 'white' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={onChange}
              sx={{ input: { color: 'white' }, label: { color: 'white' } }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'green' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/register" variant="body2" style={{ color: 'white', textDecoration: 'none' }}>
                Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;