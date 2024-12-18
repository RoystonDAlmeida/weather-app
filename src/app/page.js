// app/page.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from "./Components/Header"
import LocationManager from "./Components/LocationManager";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    // Check if location query parameter exists
    const locationQuery = new URLSearchParams(window.location.search).get('location');
    if (locationQuery) {
      // Redirect to home page
      router.push('/');
    }
  }, [router]); // Depend on router

  return (
    <div>
      <Header/>
      <main className="main">
           {/* Include the Location Manager component(contains search bar) */}
          <LocationManager />
      </main>
    </div>
  );
}
