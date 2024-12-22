import React from 'react';
import { Box, Typography } from '@mui/material';
import { Water, Cloud, ArrowUpward } from '@mui/icons-material';

const WeatherInfoBox = ({ weatherData }) => {

    // Set the pressure, humidity, sea level and ground level values
    const pressure = weatherData.main.pressure;
    const humidity = weatherData.main.humidity;
    const sea_level = weatherData.main.sea_level;
    const grnd_level = weatherData.main.grnd_level;

    return (
        <Box
            sx={{
                height: 'auto',
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: 3,
                width: '300px', // Adjust as needed
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Weather Information
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <Cloud sx={{ color: 'lightblue', marginRight: 1 }} />
                <Typography variant="body1">
                    Pressure: {pressure} hPa
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <Water sx={{ color: 'lightgreen', marginRight: 1 }} />
                <Typography variant="body1">
                    Humidity: {humidity}% 
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <ArrowUpward sx={{ color: 'orange', marginRight: 1 }} />
                <Typography variant="body1">
                    Sea Level: {sea_level} hPa
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpward sx={{ color: 'yellow', marginRight: 1 }} />
                <Typography variant="body1">
                    Ground Level: {grnd_level} hPa
                </Typography>
            </Box>
        </Box>
    );
};

export default WeatherInfoBox;
