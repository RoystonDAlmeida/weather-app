// components/LocationAccessPopup.js
'use client';

import React from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LocationAccessPopup = ({ onClose, requestLocation }) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: 3,
                zIndex: 1000,
            }}
        >
            {/* Close Button */}
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: 'black', // Color for the close button
                }}
            >
                <CloseIcon />
            </IconButton>
            
            <Typography variant="h6" sx={{ color: 'black' }}>Allow Location Access</Typography>
            <Typography variant="body1" sx={{ color: 'black' }}>
                This app requires access to your location to provide better services.
            </Typography>
            <Box sx={{ marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={requestLocation}>
                    Allow
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose} sx={{ marginLeft: 2 }}>
                    Dont Allow
                </Button>
            </Box>
        </Box>
    );
};

export default LocationAccessPopup;