import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const NavBar = ({ onScrollToSection }) => {
  const scrollToTable = () => {
    // console.log('hey')
    onScrollToSection(); // Call the onScrollToSection function passed from the parent component
  };
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-start',
      p: 2,
      mt: -3.5,
      gap: 2,
    }}>
    
      {/* Add a new button for scrolling to the Table component */}
      <Button
        variant="outlined"
        size="small"
        onClick={scrollToTable}
        sx={{
          color: 'text.primary',
          borderColor: 'primary.main',
          ':hover': {
            backgroundColor: 'primary.light',
            color: 'primary.contrastText',
          },
          fontWeight: 'bold',
          fontSize: '0.875rem',
        }}
      >
        Data Table
      </Button>
    </Box>
  );
};

export default NavBar;
