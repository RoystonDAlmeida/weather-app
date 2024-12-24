// src/app/weather-forecast/[country]/[location]/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Snackbar } from '@mui/material';
import Header from '@/app/Components/Header';
import ClientLayout from '@/app/ClientLayout';
import CurrentWeather from '../../WeatherComponents/CurrentWeather';
import WeatherMap from '../../WeatherComponents/WeatherMap';
import TodaysWeather from '../../WeatherComponents/TodaysWeather';
import HourlyWeather from '../../WeatherComponents/HourlyWeather';
import TenDaysWeatherForecast from '../../WeatherComponents/TenDaysWeatherForecast';
import WeatherInfoBox from '../../WeatherComponents/WeatherInfoBox';
import SunInfoBox from '../../WeatherComponents/SunInfoBox';

const WeatherDetails = ({ params }) => {
    const { country, location } = React.use(params); // Accessing dynamic parameters

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false); // State to track if location is saved
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(''); // State for Snackbar message
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // State for Snackbar severity

    useEffect(() => {
        const fetchWeatherDetails = async () => {
            if (country && location) {
                try {
                    const response = await fetch(`/api/WeatherForecastByLocation?country=${encodeURIComponent(country)}&location=${encodeURIComponent(location)}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch weather details');
                    }
                    const data = await response.json();
                    setWeatherData(data);
                } catch (error) {
                    console.error('Error fetching weather details:', error);
                    setError(error.message); // Set error message
                } finally {
                    setLoading(false); // Set loading to false after fetching
                }
            }
        };

        fetchWeatherDetails(); // Call the async function
    }, [country, location]); // Dependencies for useEffect

    // Check if location is already saved
    useEffect(() => {
        const checkLocationSaved = async () => {
            try {
                const response = await fetch(`/api/checksavedLocation?country=${encodeURIComponent(country)}&location=${encodeURIComponent(location)}`);
                if (response.ok) {
                    const data = await response.json();
                    setIsSaved(data.exists); // Set isSaved based on response
                }
            } catch (error) {
                console.error('Error checking saved location:', error);
            }
        };

        checkLocationSaved(); // Call the function to check if the location is saved
    }, [country, location]); // Dependencies for this effect

    // Function to save location
    const saveLocation = async () => {
        try {
            const response = await fetch('/api/saveLocation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ country, location }),
            });

            if (!response.ok) {
                throw new Error('Failed to save location');
            }

            setIsSaved(true); // Update state to indicate location is saved
            setSnackbarMessage('Location saved successfully!'); // Set success message
            setSnackbarSeverity('success'); // Set severity to success
            setSnackbarOpen(true); // Open Snackbar
        } catch (error) {
            console.error('Error saving location:', error);
            setError(error.message);
            setSnackbarMessage(`Error: ${error.message}`); // Set error message
            setSnackbarSeverity('error'); // Set severity to error
            setSnackbarOpen(true); // Open Snackbar
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false); // Close Snackbar
    };

    // Extracting needed data for Header
    const cityName = weatherData ? weatherData.name : '';
    const temperature = weatherData ? weatherData.main.temp : '';
    const weatherIcon = weatherData ? weatherData.weather[0].icon : ''; // Adjust based on your API response structure

    return (
        <ClientLayout cityName={cityName} country={country} loading={loading}>
            <Box>
                {/* Pass loading state to Header */}
                <Header cityName={cityName} country={country} temperature={temperature} weatherIcon={weatherIcon} loading={loading} />
                
                {/* Render error message if any */}
                {error && <Typography color="error">Error: {error}</Typography>}

                {/* Save Location Button */}
                {!loading && <Box sx={{ textAlign: 'center', marginTop: 1, marginBottom: 2 }}>
                    <Button 
                        variant="contained" 
                        style={{
                            backgroundColor: isSaved ? 'blue' : undefined,
                            color: isSaved ? 'white' : undefined,
                        }} 
                        onClick={isSaved ? null : saveLocation}
                        disabled={isSaved}
                    >
                        {isSaved ? 'Location Saved' : 'Save Location'}
                    </Button>
                </Box>}

                <Box sx={{ width: '50%', margin: '0 auto' }}>
                    {/* Render your today's weather data here */}
                    {weatherData && <TodaysWeather weatherData={weatherData}/>}
                </Box>
                <Box sx={{ width: '50%', margin: '0 auto' }}>
                    {/* Render your current weather data here */}
                    {weatherData && <CurrentWeather weatherData={weatherData}/>}
                </Box> 
                <Box sx={{ width: '50%', margin: '0 auto' }}>
                    {/* Render your weather map radar here */}
                    {weatherData && <WeatherMap weatherData={weatherData}/>}
                </Box>
                <Box sx={{ width: '50%', margin: '0 auto' }}>
                    {/* Render your hourly weather data here */}
                    {weatherData && <HourlyWeather weatherData={weatherData}/>}
                </Box>
                <Box sx={{ width: '50%', margin: '0 auto' }}>
                    {/* Render your Ten-days weather forecast here */}
                    {weatherData && <TenDaysWeatherForecast weatherData={weatherData}/>}
                </Box>
                <Box sx={{ width: '50%', margin: '0 auto', display: 'flex', flexDirection:'row' }}>
                    {/* Render your weather info(pressure, humidity etc) here */}
                    {weatherData && <WeatherInfoBox weatherData={weatherData}/>}
                    
                    {/* Render your sunrise and sunset information here */}
                    {weatherData && <SunInfoBox weatherData={weatherData}/>}
                </Box>

                {/* Snackbar for success or error notification */}
                <Snackbar
                    open={snackbarOpen}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                    autoHideDuration={3000} // Automatically close after 3 seconds
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position of the snackbar
                    ContentProps={{
                        style: {
                            backgroundColor: snackbarSeverity === 'success' ? '#4caf50' : '#f44336', // Green for success, Red for error
                        },
                    }}
                />
            </Box>
        </ClientLayout>
    );
};

export default WeatherDetails;
