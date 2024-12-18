// components/RoundedBox.js

import React from 'react';
import { Box } from '@mui/material';
import SearchBar from './SearchBar'; // Adjust the import based on your file structure

const RoundedBox = ({ address }) => {
    return (
        <Box
            sx={{
                width: 'calc(100% - 20px)', // Adjust width to account for margins
                height: '500px', // Set a fixed height for the rounded box
                backgroundColor: 'black', // Set background color to black
                borderRadius: '16px', // Set border radius for curved corners
                padding: '10px', // Set padding to 10px from all corners
                margin: '10px', // Set margin to 10px from all sides
                color: 'white', // Set text color to white for contrast
                display: 'flex',
                flexDirection: 'column', // Stack children vertically
                justifyContent: 'flex-start', // Center children vertically
                alignItems: 'center', // Center children horizontally
                boxSizing: 'border-box', // Include padding in width and height calculations
            }}
        >
            <SearchBar address={address} />
            {/* Add a container for results */}
            <Box 
                sx={{
                    marginTop: '10px', // Add some space between search bar and results
                    width: '100%', // Take full width of the parent container
                    flexGrow: 1, // Allow this box to grow and take available space
                    overflowY: 'auto', // Enable vertical scrolling if needed
                    maxHeight: '200px', // Set a maximum height for the results box
                }}
            >
                {/* Here you would render your search results */}
            </Box>
        </Box>
    );
};

export default RoundedBox;
