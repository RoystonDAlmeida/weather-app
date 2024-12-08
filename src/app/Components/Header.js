// components/Header.js

'use client'; // Mark this as a client component

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BLOCKED_PAGES } from 'next/dist/shared/lib/constants';

// Create a theme with custom colors
const theme = createTheme({
    palette: {
        primary: {
            main: '#001f3f', // Navy blue color
            contrastText: '#ffffff', // White text for contrast
        },
        secondary: {
            main: '#FF7F50', // Coral color for the button
        },
    },
    typography: {
        fontFamily: [
            'Roboto', // Use Roboto for body text
            'Arial',
            'sans-serif',
        ].join(','),
        h6: {
            fontFamily: 'Lobster', // Use Lobster for the header text
            fontWeight: 700,
            fontSize: '2rem', // Adjust size as needed
            letterSpacing: '0.1rem', // Add letter spacing for style
            color: '#ffffff', // Change text color to white for contrast
        },
    },
});

const Header = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Weather App
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="secondary" // Use secondary color (coral)
                        sx={{
                            marginLeft: 'auto',
                            borderRadius: '20px', // Curved edges
                            transition: 'background-color 0.3s ease, transform 0.2s ease',
                            '&:hover': {
                                backgroundColor: '#FF6347', // Tomato color on hover
                                transform: 'scale(1.05)', // Slightly enlarge on hover
                            },
                            '&:active': {
                                backgroundColor: '#FF4500', // OrangeRed color on click
                                transform: 'scale(0.95)', // Slightly shrink on click
                            },
                            fontFamily: theme.typography.fontFamily, // Same font as Typography
                            fontWeight: 'bold',
                            color: '#ffffff',
                        }} 
                        onClick={() => alert('Button Clicked!')} // Example click handler
                    >
                        View Saved Locations
                    </Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;