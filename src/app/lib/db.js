// lib/db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Connect to the PostgreSQL server using the default database
const pool = new Pool({
    connectionString: process.env.POSTGRES_DATABASE_URL, // Ensure this connects to a default database like 'postgres'
});

// Function to create the saved_locations database
const createDatabase = async () => {
    const dbName = 'saved_locations';
    const client = await pool.connect();
    
    try {
        // Create the database if it doesn't exist
        await client.query(`CREATE DATABASE "${dbName}"`);
        console.log(`Database "${dbName}" created successfully.`);
    } catch (error) {
        if (error.code === '42P04') { // Database already exists
            console.log(`Database "${dbName}" already exists.`);
        } else {
            console.error('Error creating database:', error);
        }
    } finally {
        client.release();
    }
};

// Function to create the saved_locations table
const createSavedLocationsTable = async () => {
    const dbName = 'saved_locations';
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS public.saved_locations (
            id SERIAL PRIMARY KEY,
            country VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            UNIQUE (country, location) -- Ensure that each country-location pair is unique
        );
    `;

    // Create a new pool connection for the saved_locations database
    const newPool = new Pool({
        connectionString: `${process.env.POSTGRES_DATABASE_URL}/${dbName}`, // Connect directly to the new database
    });

    const client = await newPool.connect();

    try {
        // Create the table in the public schema
        await client.query(createTableQuery);
        console.log('Table "saved_locations" created or already exists.');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        client.release();
        await newPool.end(); // Close the new pool connection
    }
};

// Function to get a new pool connection for saved_locations database
export const getSavedLocationsPool = () => {
    const dbName = 'saved_locations';
    return new Pool({
        connectionString: `${process.env.POSTGRES_DATABASE_URL}/${dbName}`, // Connect directly to the saved_locations database
    });
};

// Main function to set up the database and table
export const setupDatabase = async () => {
    await createDatabase(); // Create the database
    await createSavedLocationsTable(); // Create the table in the database
};

export default pool;