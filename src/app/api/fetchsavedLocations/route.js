// src/app/api/fetchsavedLocations/route.js

import { NextResponse } from 'next/server';
import { getSavedLocationsPool } from '@/app/lib/db'; // Import your database connection function
//import fetch from 'node-fetch'; // Make sure to install node-fetch if not already installed

export async function GET() {
    try {
        const pool = getSavedLocationsPool();
        const client = await pool.connect();

        // Fetch saved locations from the database
        const result = await client.query('SELECT * FROM public.saved_locations');
        const savedLocations = result.rows;

        // Fetch current weather data for each saved location
        const weatherDataPromises = savedLocations.map(async (location) => {
            const response = await fetch(`${process.env.OPENWEATHERMAP_API_URL}?q=${location.location},${location.country}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error(`Failed to fetch weather for ${location.location}`);
            }
            const weatherData = await response.json();
            return {
                name: location.location,
                country: location.country,
                temperature: weatherData.main.temp,
                weatherDescription: weatherData.weather[0].description, // Weather condition (e.g., broken clouds)
                icon: weatherData.weather[0].icon, // Weather icon code
            };
        });

        const weatherData = await Promise.all(weatherDataPromises);

        client.release(); // Release the client back to the pool

        return NextResponse.json(weatherData); // Return the combined data
    } catch (error) {
        console.error('Error fetching saved locations or weather:', error);
        return NextResponse.json({ message: 'Failed to fetch saved locations or weather.' }, { status: 500 });
    }
}