import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SpeedIcon from '@mui/icons-material/Speed'; // Icon for speed
import AirIcon from '@mui/icons-material/Air'; // Icon for gust
import CompassCalibrationIcon from '@mui/icons-material/CompassCalibration'; // Icon for direction

const WindInfo = ({ wind }) => {
    // Convert speed and gust from m/s to km/h
    const speedKmh = Math.round((wind.speed * 3.6).toFixed(2)); // Convert speed to km/h
    const gustKmh = Math.round((wind.gust * 3.6).toFixed(2));   // Convert gust to km/h

    return (
        <Box
            sx={{
                backgroundColor: 'black', // Background color of the box
                borderRadius: '8px', // Rounded corners
                padding: '10px',     // Padding inside the box
                color: 'white',      // Text color
                boxShadow: 3         // Optional shadow for depth
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <SpeedIcon sx={{ color: '#B0BEC5', marginRight: 1 }} />
                <Typography variant="body2" sx={{ color: '#B0BEC5' }}>Speed:</Typography>
                <Typography variant="body1" sx={{ marginLeft: 1 }}>{speedKmh} km/h</Typography>
            </Box>
            <Divider sx={{ backgroundColor: '#B0BEC5', marginBottom: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <AirIcon sx={{ color: '#B0BEC5', marginRight: 1 }} />
                <Typography variant="body2" sx={{ color: '#B0BEC5' }}>Gust:</Typography>
                <Typography variant="body1" sx={{ marginLeft: 1 }}>{gustKmh} km/h</Typography>
            </Box>
            <Divider sx={{ backgroundColor: '#B0BEC5', marginBottom: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CompassCalibrationIcon sx={{ color: '#B0BEC5', marginRight: 1 }} />
                <Typography variant="body2" sx={{ color: '#B0BEC5' }}>Direction:</Typography>
                <Typography variant="body1" sx={{ marginLeft: 1 }}>{wind.deg}°</Typography>
            </Box>
        </Box>
    );
};

export default WindInfo;
