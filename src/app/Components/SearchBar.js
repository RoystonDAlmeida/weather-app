// components/SearchBar.js
'use client';

import React, { useState, useEffect,Suspense } from 'react';
import { Card, TextField, IconButton, InputAdornment, Box, Snackbar, Alert, Grid, Typography, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';   // To-do
import LocationCard from './LocationCard';
import LoadingSkeleton from './LoadingSkeleton';
import { delay } from '../utils/delay';

const SearchBar = ({ address }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState(address || ''); // Initialize with address if available
    const { replace } = useRouter();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
    const [timeoutId, setTimeoutId] = useState(null); // State to hold timeout ID

    // Effect to trigger search when address is provided
    useEffect(() => {
        if (address) {
                setSearchTerm(address);
                handleSearch(address);
        }
    }, [address]); // Run when address changes

    const handleSearch = async(term) => {
        const params = new URLSearchParams(searchParams);

        if (term) { // Check for 2 or more characters
            params.set('location', term);
            replace(`${pathname}?${params.toString()}`);

            // Add a delay before making the API call
            await delay(10000); // Wait for 10 seconds

            // Fetch matching cities
            setLoading(true);
            try {
                const response = await fetch(`/api/OpenWeatherLocation?location=${term}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setSearchResults(data); // Assuming data is an array of location objects with weather data
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        } else {
            params.delete('location');
            replace(`${pathname}?${params.toString()}`);
            setSearchResults([]); // Clear results when input is empty

            // Show snackbar alert if no term is entered
            setSnackbarOpen(true);

            // Redirect to home page if no term is entered
            replace('/');
        }
        
    }; 

    // Handle input change
    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term); // Update search term state

        // Clear previous timeout if it exists
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set a new timeout to delay the API call
        const newTimeoutId = setTimeout(() => {
            handleSearch(term);
        }, 10000); // Delay for 10 seconds

        setTimeoutId(newTimeoutId); // Store the new timeout ID
    };

    // Function to handle snackbar close
    const handleSnackbarClose = () => {
            setSnackbarOpen(false);
    };

    // Prevent default form submission behavior
    const handleSubmit = (e) => {
            e.preventDefault();
            if (!searchTerm) {
                setSnackbarOpen(true); // Show alert if search term is empty
                replace('/'); // Redirect to home page if no term is entered

            }
    };

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', position:'absolute' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
                variant="outlined"
                value={ searchTerm }
                onChange={handleInputChange}    // Use the new input change handler
                fullWidth
                placeholder="Type a Location, City" // Static placeholder text
                sx={{
                    backgroundColor: '#A9A9A9', // Dark gray background
                    borderRadius: '20px', // Rounded corners
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none', // Remove default border
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none', // Remove border on hover
                    },
                    '& .MuiInputBase-input': {
                        color: '#006400', // Dark green text color for the input
                        fontFamily: '"Courier New", Courier, monospace', // Typewriter font
                        fontWeight: 'bold', // Make text bold
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Box 
                                sx={{
                                    backgroundColor: 'black', // Black background for the icon box
                                    borderRadius: '4px', // Slightly rounded corners for the box
                                    padding: '5px', // Padding around the icon
                                }}
                            >
                                <IconButton type="submit" aria-label="search">
                                    <SearchIcon style={{ color: 'white' }} /> {/* Change icon color to white */}
                                </IconButton>
                            </Box>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
        
            {/* Use Suspense to display loading state */}
            <Suspense fallback={<LoadingSkeleton />}>
                {/* Display search results vertically using Stack */}
                {searchResults.length > 0 ? (
                    <Stack spacing={2} sx={{ marginTop: 2 }}>
                        {searchResults.map((location) => (
                            <Link key={location.id || `${location.lat}-${location.lon}`} href={`/weather-forecast/${encodeURIComponent(location.country.toLowerCase())}/${encodeURIComponent(location.name.toLowerCase())}`}>
                                <LocationCard  location={location}/>
                            </Link>
                        ))}
                    </Stack>
                ) : 
                (!loading && searchTerm && searchResults.length === 0 && (
                        <Card sx={{ marginTop: 2, backgroundColor: '#000', color: 'white', padding: 2, border: '2px solid white',  borderRadius: '8px' }}>
                            <Typography variant="body1" align="center">
                                No results found.
                            </Typography>
                        </Card>
                    )
                )}
            </Suspense>

        {/* Snackbar for alerting user */}
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                Please enter a location!
            </Alert>
        </Snackbar>
        </div>
    );
};

export default SearchBar;