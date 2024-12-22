import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const timezone = 'auto'; // Use 'auto' as default if not provided

    if (!latitude || !longitude) {
        return NextResponse.json({ error: 'Latitude and longitude are required.' }, { status: 400 });
    }

    const apiUrl = `${process.env.OPEN_METEO_API_URL}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=${timezone}&forecast_days=10`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();

        // Map daily data for the next 10 days
        const dailyData = data.daily.time.map((date, index) => ({
            date: date,
            temperature_max: data.daily.temperature_2m_max[index],
            temperature_min: data.daily.temperature_2m_min[index],
            weather_code: data.daily.weather_code[index],
            precipitation_sum: data.daily.precipitation_sum[index],
        }));

        return NextResponse.json(dailyData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
