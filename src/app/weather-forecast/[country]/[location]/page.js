// src/app/weather-forecast/[country]/[location]/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import Header from '@/app/Components/Header';
import ClientLayout from '@/app/ClientLayout';
import CurrentWeather from '../../WeatherComponents/CurrentWeather';
import WeatherMap from '../../WeatherComponents/WeatherMap';
import TodaysWeather from '../../WeatherComponents/TodaysWeather';
import HourlyWeather from '../../WeatherComponents/HourlyWeather';
import TenDaysWeatherForecast from '../../WeatherComponents/TenDaysWeatherForecast';
import WeatherInfoBox from '../../WeatherComponents/WeatherInfoBox';
import SunInfoBox from '../../WeatherComponents/SunInfoBox';

const WeatherDetails = ({params}) => {
    const { country, location } = React.use(params); // Accessing dynamic parameters

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    {weatherData && <HourlyWeather weatherData = {weatherData}/>}
                </Box>
                <Box sx={{ width: '50%', margin: '0 auto' }}>
                    {/* Render your Ten-days weather forecast here */}
                    {weatherData && <TenDaysWeatherForecast weatherData = {weatherData}/>}
                </Box>
                <Box sx={{ width: '50%', margin: '0 auto', display: 'flex', flexDirection:'row' }}>
                    {/* Render your weather info(pressure, humidity etc) here */}
                    {weatherData && <WeatherInfoBox weatherData = { weatherData }/>}

                    {/* Render your sunrise and sunset information here */}
                    {weatherData && <SunInfoBox weatherData = { weatherData }/>}
                </Box>
            </Box>
        </ClientLayout>
    );
};

export default WeatherDetails;
