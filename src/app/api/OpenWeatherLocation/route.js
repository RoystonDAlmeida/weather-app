// api/OpenWeatherMap/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('location');

  if(!city) {
    return NextResponse.json({ error: 'City Name is required' }, { status: 400 });
  }

  try {
    // Step 1: Get coordinates from Geocoding API
    const geoResponse = await axios.get(`${process.env.GEOCODING_API_URL}?q=${city}&limit=10&appid=${process.env.OPENWEATHERMAP_API_KEY}`);

    if (geoResponse.data.length === 0) {
        // If no city found, return a 404 status without a message
        return NextResponse.json(null, { status: 404 });
    }

    // Retrive latitude and longitude of each location
    const locations = geoResponse.data.map(loc=>({
      name: loc.name,
      country: loc.country,
      lat: loc.lat,
      lon: loc.lon,
    }));

    // Step 2: Fetch weather data using coordinates
    const weatherPromises = locations.map(async(loc) =>{
      const weatherResponse = await axios.get(`${process.env.OPENWEATHERMAP_API_URL}?lat=${loc.lat}&lon=${loc.lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`);
      return {
        ...loc,
        temperature:weatherResponse.data.main.temp, // Get termperature
        weatherDescription: weatherResponse.data.weather[0].description,  // Get description
        icon: weatherResponse.data.weather[0].icon, // Get icon code
      };
    });

    // Wait for all weather data to be fetched
    const resultsWithWeather = await Promise.all(weatherPromises);

    // Return the combined weather data results
    return NextResponse.json(resultsWithWeather, { status: 200 });
    } 
        
    catch (error) {
        console.error('Error fetching weather data:', error);
        return NextResponse.json({ error: 'Failed to fetch data from OpenWeatherMap' }, { status: 500 });
    }

}