// src/app/api/deleteLocation/route.js
import { NextResponse } from 'next/server';
import { getSavedLocationsPool } from '@/app/lib/db'; // Import your database connection function

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get('country');
    const location = searchParams.get('location');

    if (!country || !location) {
        return NextResponse.json({ message: 'Country and location are required.' }, { status: 400 });
    }

    try {
        const pool = getSavedLocationsPool();
        const client = await pool.connect();

        // Delete the location from the saved_locations table
        await client.query(
            'DELETE FROM public.saved_locations WHERE country = $1 AND location = $2',
            [country, location]
        );

        client.release(); // Release the client back to the pool

        return NextResponse.json({ message: 'Location deleted successfully.' }); // Return success message
    } catch (error) {
        console.error('Error deleting location:', error);
        return NextResponse.json({ message: 'Failed to delete location.' }, { status: 500 });
    }
}