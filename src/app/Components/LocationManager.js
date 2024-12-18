// src/app/components/LocationManager.js
'use client';

import React, { useState } from 'react';
import LocationAccess from '../LocationAccess/LocationAccess';
import RoundedBox from './RoundedBox';

const LocationManager = () => {
    const [address, setAddress] = useState('');

    return (
        <div>
            <LocationAccess setAddress={setAddress} />
            <RoundedBox address={address} />
        </div>
    );
};

export default LocationManager;
