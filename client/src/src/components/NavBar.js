import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const NavBar = ({ onScrollToSection, localManagementRef, highChartRef }) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-start',
      p: 2,
      mt: -3.5,
      gap: 2, // Adjusts the space between navigation items
      // backgroundColor: 'background.paper', // Use theme colors for consistency
      // boxShadow: 3, // Adds subtle shadow for depth
    }}>
      <Button
        variant="outlined" // Gives a more button-like appearance
        size="small" // Makes the button smaller
        onClick={() => onScrollToSection(localManagementRef)}
        sx={{
          color: 'text.primary',
          borderColor: 'primary.main',
          ':hover': {
            backgroundColor: 'primary.light',
            color: 'primary.contrastText',
          },
          fontWeight: 'bold',
          fontSize: '0.875rem', // Smaller font size
        }}
      >
        Expense Form
      </Button>
      <Button
        variant="outlined"
        size="small"
        onClick={() => onScrollToSection(highChartRef)}
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
        High Chart
      </Button>
    </Box>
  );
};

export default NavBar;
