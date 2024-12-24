// src/app/api/checksavedLocation/route.js
import { NextResponse } from 'next/server';
import { getSavedLocationsPool } from '@/app/lib/db';// Import the function to get a pool for saved_locations

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get('country');
    const location = searchParams.get('location');

    if (!country || !location) {
        return NextResponse.json({ message: 'Country and location are required.' }, { status: 400 });
    }

    try {
        const pool = getSavedLocationsPool();
        const client = await pool.connect();

        const result = await client.query(
            'SELECT * FROM public.saved_locations WHERE country = $1 AND location = $2',
            [country, location]
        );

        client.release(); // Release the client back to the pool

        if (result.rowCount > 0) {
            return NextResponse.json({ exists: true }); // Location exists
        } else {
            return NextResponse.json({ exists: false }); // Location does not exist
        }
    } catch (error) {
        console.error('Error checking location:', error);
        return NextResponse.json({ message: 'Failed to check location.' }, { status: 500 });
    }
}