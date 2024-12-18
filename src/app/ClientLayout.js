// app/ClientLayout.js
'use client';

import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingComponents/LoadingSpinner';

export default function ClientLayout({ children, cityName, country, isLoading }) {
  const [locationTitle, setLocationTitle] = useState('');
  const [spinnerFrame, setSpinnerFrame] = useState(0);

  // Spinner animation in title
  useEffect(() => {
    if (cityName && country) {
      document.title = `${cityName}, ${country} | Weather App`;
      setLocationTitle(`${cityName}, ${country} | Weather App`);
    }

    const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    const intervalId = setInterval(() => {
      setSpinnerFrame((prevFrame) => (prevFrame + 1) % spinnerChars.length);
    }, 100);

    return () => clearInterval(intervalId);
  }, [cityName, country]);

  // Update the document title with spinner
  useEffect(() => {
    if (isLoading) {
      const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
      document.title = `${spinnerChars[spinnerFrame]} ${locationTitle.toUpperCase() || 'Loading...'}`;
    }
  }, [isLoading, spinnerFrame, locationTitle]);

  return (
    <header>
      {isLoading && <LoadingSpinner />}
      {children}
    </header>
  );
}