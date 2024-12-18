import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const timezone = 'auto'; // Use 'auto' as default if not provided

    if (!latitude || !longitude) {
        return NextResponse.json({ error: 'Latitude and longitude are required.' }, { status: 400 });
    }

    const apiUrl = `${process.env.OPEN_METEO_API_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode,precipitation&timezone=${timezone}&forecast_hours=12`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();

        // Map hourly data for the next 12 hours starting from the current time
        const hourlyData = data.hourly.time.map((time, index) => ({
            time: time,
            temperature: data.hourly.temperature_2m[index],
            weathercode: data.hourly.weathercode[index],
            precipitation: data.hourly.precipitation[index],
        }));

        return NextResponse.json(hourlyData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
