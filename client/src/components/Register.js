import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Container, Link as MuiLink, Box } from "@mui/material";
// import { toast } from "react-toastify";

const Register = ({setAuth}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      console.log(parseRes);

      
        localStorage.setItem("token", parseRes.jwtToken);
      // add auth here to true
      setAuth(true);
        // toast.success("Register Successfully");
      
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 4,
            borderRadius: 1
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={onSubmit} style={{ width: '100%', marginTop: '1rem' }}>
            <TextField
              type="text"
              name="name"
              label="Name"
              value={name}
              onChange={onChange}
              margin="normal"
              required
              fullWidth
              sx={{ input: { color: 'white' }, label: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'grey.500' } } }}
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              value={email}
              onChange={onChange}
              margin="normal"
              required
              fullWidth
              sx={{ input: { color: 'white' }, label: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'grey.500' } } }}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              value={password}
              onChange={onChange}
              margin="normal"
              required
              fullWidth
              sx={{ input: { color: 'white' }, label: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'grey.500' } } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'green' }}
            >
              Register
            </Button>
          </form>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginTop: '1rem' }}>
            Already have an account? Sign in
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;