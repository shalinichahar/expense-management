import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Container, Link as MuiLink } from "@mui/material";
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
    <Container style={{ marginTop: "5rem" }}>
      <Typography variant="h5" align="center">
        Register
      </Typography>
      <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={onSubmit}>
        <TextField
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={onChange}
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={onChange}
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <TextField
          type="text"
          name="name"
          label="Name"
          value={name}
          onChange={onChange}
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ margin: "3rem 0 2rem" }}
        >
          Submit
        </Button>
      </form>
      <MuiLink component={Link} to="/login" variant="body2">
        Already have an account? Sign in
      </MuiLink>
    </Container>
  );
};

export default Register;
