// src/app/api/WeatherForecastByLocation/route.js

import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const location = searchParams.get('location');

    // Validate parameters
    if (!location || !country) {
        return NextResponse.json(
            { error: 'Location and country are required' },
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    // Construct the URL for the OpenWeather API
    const apiUrl = `${process.env.OPENWEATHERMAP_API_URL}?q=${encodeURIComponent(location)},${encodeURIComponent(country)}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`;

    try {
        // Fetch weather data from OpenWeather API
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        console.log(data);
        return NextResponse.json(data, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}

