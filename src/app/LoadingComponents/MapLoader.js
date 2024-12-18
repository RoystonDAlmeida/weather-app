// components/MapLoader.js

import React from 'react';
import { Box } from '@mui/material';

const MapLoader = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: '#B0BEC5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    width: '80%',
                    height: '10px',
                    backgroundColor: '#757575',
                    marginBottom: '10px',
                    borderRadius: '5px',
                }}
            ></Box>
            <Box
                sx={{
                    width: '80%',
                    height: '10px',
                    backgroundColor: '#757575',
                    marginBottom: '10px',
                    borderRadius: '5px',
                }}
            ></Box>
            <Box
                sx={{
                    width: '80%',
                    height: '10px',
                    backgroundColor: '#757575',
                    borderRadius: '5px',
                }}
            ></Box>
        </Box>
    );
};

export default MapLoader;
