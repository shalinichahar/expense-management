import React, { useEffect, useState, useRef } from "react";
import LocalManagement from "./LocalManagement";
import Header from "./Header";
import NavBar from "./NavBar";
import HighChart from "./HighChart";
import { theme } from "../helper/Theme";
import { ThemeProvider, Grid } from '@mui/material'; 
const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseData = await response.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header name={name} setAuth={setAuth} />
        <Grid container spacing={3} style={{ marginTop: '20px', padding: '0 20px' }}>
          <Grid item xs={12} md={6}>
            <div>
              <LocalManagement name={name} displayTable={false} displayForm={true}  />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <HighChart />
          </Grid>
        
          <Grid item xs={12}>
            <div>
              <LocalManagement name={name} displayTable={true} displayForm={false} />
            </div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
