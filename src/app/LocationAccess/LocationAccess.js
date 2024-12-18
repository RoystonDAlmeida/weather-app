// components/LocationAccess.js
'use client';

import React, { useState } from 'react';
import LocationAccessPopup from './LocationAccessPopup';

const LocationAccess = ({ setAddress }) => {
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(true);

    const fetchLocation = async (latitude, longitude) => {
        try {
          const response = await fetch(`/api/geocode?lat=${latitude}&lon=${longitude}`);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();

          // Assuming the address is located in the first feature's properties
          if (data.features && data.features.length > 0) {
            const fetchedAddress = data.features[0].properties.city + ', ' + data.features[0].properties.country;
            setAddress(fetchedAddress);
          } else {
            setAddress('Address not found');
          }
        } catch (error) {
          console.error('Error fetching location:', error);
          setAddress('Error fetching address');
        }
      };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    
    const requestLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Location access granted');

                // Fetch latitude and longitude values
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLat(latitude);
                setLon(longitude);
                fetchLocation(latitude, longitude);

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