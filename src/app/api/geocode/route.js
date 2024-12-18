// src/app/api/geocode/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  // Construct the Geoapify API URL
  const geoapifyUrl = `${process.env.GEOAPIFY_API_URL}?lat=${lat}&lon=${lon}&apiKey=${process.env.GEOAPIFY_API_KEY}`;
  try {
    const response = await fetch(geoapifyUrl);
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data from Geoapify' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching location:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
