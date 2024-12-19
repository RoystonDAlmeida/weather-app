import { useState, useEffect, Suspense } from 'react';
import { Box, Typography, Divider, IconButton, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HourlyWeatherSkeleton from '@/app/LoadingComponents/HourlyWeatherSkeleton';
import HourlyWeatherGrid from './HourlyWeatherGrid';

const HourlyWeather = ({ weatherData }) => {
    const [hourlyData, setHourlyData] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0); // Track the current index for navigation
    const itemsPerPage = 6; // Number of items to display per row

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`/api/HourlyWeather?latitude=${weatherData.coord.lat}&longitude=${weatherData.coord.lon}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setHourlyData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchWeatherData();
    }, [weatherData]);

    // Function to handle navigation
    const handleNext = () => {
        if (currentIndex + itemsPerPage < hourlyData.length) {
            setCurrentIndex(currentIndex + 1); // Move to the next item
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1); // Move to the previous item
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'black',
                borderRadius: '16px',
                padding: '10px',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px'
            }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#B0BEC5' }}>HOURLY WEATHER</Typography>
            </Box>
            <Divider sx={{ backgroundColor: '#B0BEC5', marginTop: 1 }} />

            {error ? (
                <Typography variant="body2" sx={{ color: 'red', marginTop: 2 }}>
                    Error: {error}
                </Typography>
            ) : (
                <Suspense fallback={<HourlyWeatherSkeleton />}>
                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                        {/* Render hourly data in a grid with a maximum of 6 items */}
                        {hourlyData.slice(currentIndex, currentIndex + itemsPerPage).map((hour, index) => (
                            <Grid item xs={2} key={index}>
                                <HourlyWeatherGrid hour={hour}/>
                            </Grid>
                        ))}
                    </Grid>
                </Suspense>
            )}

            {/* Navigation Arrows */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <IconButton aria-label="previous" onClick={handlePrevious} disabled={currentIndex === 0}>
                    <ArrowBackIcon sx={{ color: '#B0BEC5' }} />
                </IconButton>
                <IconButton aria-label="next" onClick={handleNext} disabled={currentIndex + itemsPerPage >= hourlyData.length}>
                    <ArrowForwardIcon sx={{ color: '#B0BEC5' }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default HourlyWeather;
