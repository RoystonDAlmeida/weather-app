// components/RoundedBox.js

import React from 'react';
import Box from '@mui/material/Box';
import SearchBar from './SearchBar';

const RoundedBox = () => {
    return (
        <Box
            sx={{
                width: 'calc(100% - 20px)', // Adjust width to account for margins
                height: '300px', // Set height as needed
                backgroundColor: 'black', // Set background color to black
                borderRadius: '16px', // Set border radius for curved corners
                padding: '10px', // Set padding to 10px from all corners
                margin: '10px', // Set margin to 10px from all sides
                color: 'white', // Set text color to white for contrast
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box', // Include padding in width and height calculations
            }}
        >
            <SearchBar/>
        </Box>
    );
};

export default RoundedBox;