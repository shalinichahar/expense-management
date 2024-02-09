import React, { useState } from "react";
import { Link} from "react-router-dom";
import { TextField, Button, Typography, Container, Grid, Link as MuiLink } from "@mui/material";
// import { toast } from "react-toastify";

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

      console.log(parseRes.token);

      if (parseRes.token) {
        console.log("hey")
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        // toast.success("Logged in Successfully");
      }
      else {
        setAuth(false)
      }
       
        
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container style={{ marginTop: "5rem" }}>
      <Typography variant="h5" align="center">
        Login
      </Typography>
      <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={onSubmitForm}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={onChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ margin: "3rem 0 2rem" }}
        >
          Sign In
        </Button>
      </form>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <MuiLink component={Link} to="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </MuiLink>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
