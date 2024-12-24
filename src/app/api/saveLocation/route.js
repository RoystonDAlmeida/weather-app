// src/app/api/saveLocation/route.js
import { NextResponse } from 'next/server';
import { getSavedLocationsPool } from '@/app/lib/db'; // Import the function to get a pool for saved_locations

export async function POST(req) {
    try {
        const { country, location } = await req.json(); // Get data from the request body

        // Validate input
        if (!country || !location) {
            return NextResponse.json({ message: 'Country and location are required.' }, { status: 400 });
        }

        // Get a new pool connection for saved_locations database
        const pool = getSavedLocationsPool();
        const client = await pool.connect();

        try {
            // Insert the country and location into the saved_locations table
            const result = await client.query(
                'INSERT INTO public.saved_locations (country, location) VALUES ($1, $2) ON CONFLICT (country, location) DO NOTHING',
                [country, location]
            );

            // Check if a row was inserted
            if (result.rowCount === 0) {
                return NextResponse.json({ message: 'Location already exists.' }, { status: 409 }); // Conflict
            }

            return NextResponse.json({ message: 'Location saved successfully!' }, { status: 201 }); // Created
        } catch (error) {
            console.error('Error saving location:', error);
            return NextResponse.json({ message: 'Failed to save location.' }, { status: 500 }); // Internal Server Error
        } finally {
            client.release(); // Release the client back to the pool
            await pool.end(); // Close the pool connection if needed; otherwise, keep it open for future requests.
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Failed to process request.' }, { status: 500 });
    }
}