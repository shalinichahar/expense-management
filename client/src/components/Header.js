import LogoutButton from "./LogOutBtn";

import React from "react";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";

const Header = ({ name }) => {
  return (
      <AppBar position="static" sx={{ width: "100%", height: "85px", margin: "0 auto" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         Expense Tracker
        </Typography>
      </Toolbar>
      {name && (
        <Grid container justifyContent="space-between">
          <Grid item xs={56}>
            <Typography variant="body1" sx={{ marginLeft: "27px" }}>
              Welcome {name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {/* Empty Grid item to create space */}
          </Grid>
        </Grid>
          )}
          
        <LogoutButton/>
    </AppBar>
      
  );
};

export default Header;
