// components/LocationAccess.js
'use client';

import React, { useState } from 'react';
import LocationAccessPopup from './LocationAccessPopup';

const LocationAccess = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(true);

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const requestLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Location access granted:', position);
                handleClosePopup(); // Close the popup on success
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to retrieve your location. Please check your settings.');
            }
        );
    };

    return (
        <>
            {isPopupOpen && (
                <LocationAccessPopup onClose={handleClosePopup} requestLocation={requestLocation} />
            )}
        </>
    );
};

export default LocationAccess;