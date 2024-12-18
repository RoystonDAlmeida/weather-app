// components/LocationCard.js

import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Image from 'next/image';
import { getCountryFlagEmoji } from '../utils/getCountryFlagEmoji'; // Import the utility function

const LocationCard = ({ location }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card sx={{ 
            margin: '10px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            backgroundColor: isHovered ? '#444':'black', // Change background on hover
            transition: 'background-color 0.3s ease', // Smooth transition
            cursor: 'pointer', // Change cursor to pointer
            color: 'white', 
            border: '2px solid white', 
            borderRadius: '8px'
        }}
        onMouseEnter={() => setIsHovered(true)} // Set hover state to true
        onMouseLeave={() => setIsHovered(false)} // Set hover state to false
        >
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginLeft: '8px' }}>{location.name}, {location.country}</span>
                    {getCountryFlagEmoji(location.country)} {/* Display flag emoji */}
                </Typography>
                <Typography variant="body2" color="gray">
                    Condition: {location.weatherDescription}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                <Typography variant="h6" sx={{ marginRight: 1 }}>
                    {Math.round(location.temperature)}°C
                </Typography>
                {location.icon && (
                    <Image 
                        src={`http://openweathermap.org/img/wn/${location.icon}@2x.png`} 
                        alt={location.weatherDescription} 
                        width={40} // Specify width
                        height={40} // Specify height
                    />
                )}
            </Box>
        </Card>
    );
};

export default LocationCard;
