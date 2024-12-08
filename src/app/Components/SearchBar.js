// components/SearchBar.js
'use client';

import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent form submission
        console.log('Search Term:', searchTerm); // Handle the search logic here
    };

    return (
        <form onSubmit={handleSearch} style={{ width: '100%' }}>
            <TextField
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
    );
};

export default SearchBar;