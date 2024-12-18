// components/Header.js

'use client'; // Mark this as a client component

import React from 'react';
import { Box, Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image'; // Import Image for weather icon
import { getCountryFlagEmoji } from '../utils/getCountryFlagEmoji';

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

const Header = ({ cityName, country, temperature, weatherIcon, loading }) => {

    // Capitalized values
    const formattedCityName = capitalizeFirstLetter(cityName);
    const formattedCountryName = capitalizeAllLetters(country);
    
    // Get the flag emoji for the country
    const flagEmoji = country? getCountryFlagEmoji(country):''; // Assuming country is a 2-letter country code

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Typography variant="h6" component="div">
                            Weather App
                        </Typography>
                        {/* Render dividers instead of city and country names when loading */}
                        {loading ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
                                <Divider sx={{ marginRight: 1, backgroundColor: 'white', height: 24 }} />
                                <Divider sx={{ marginRight: 1, backgroundColor: 'white', height: 24 }} />
                                <Divider sx={{ marginRight: 1, backgroundColor: 'white', height: 24 }} />
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
                                <Typography variant="body1" sx={{ color: '#ffffff' }}>
                                    {formattedCityName && formattedCountryName ? `${formattedCityName}, ${flagEmoji} ${formattedCountryName} ${Math.round(temperature)}°C` : ''}
                                </Typography>
                                {weatherIcon && (
                                    <Image 
                                        src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} 
                                        alt="Weather Icon" 
                                        width={40} 
                                        height={40} 
                                        style={{ marginLeft: '8px' }} // Use marginLeft for spacing
                                    />
                                )}
                            </Box>
                        )}
                    </Box>
                    <Button 
                        variant="contained" 
                        color="secondary" // Use secondary color (coral)
                        sx={{
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

// Helper functions for formatting strings
const capitalizeFirstLetter = (string) => {
    if (!string) return ''; // Return empty string if input is undefined
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const capitalizeAllLetters = (string) => {
    if (!string) return ''; // Return empty string if input is undefined
    return string.toUpperCase();
};

export default Header;