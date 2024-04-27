import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Box } from '@mui/material';
import LogoutButton from './LogOutBtn';

const Header = ({ name, setAuth }) => {
  return (
    <AppBar position="static" sx={{
      marginBottom: 4,
      background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)', 
    }}>
      <Toolbar>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', marginTop: '5px', fontFamily:"math"}}>
            
              Expense Tracker
            </Typography>
          </Grid>
          {name && (
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Welcome, {name}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Toolbar>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 2 }}>
        <LogoutButton setAuth={setAuth} />
      </Box>
    </AppBar>
  );
};

export default Header;
