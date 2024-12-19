import React, { useEffect, useState, Suspense } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Divider, Typography } from "@mui/material";
import MapLoader from "@/app/LoadingComponents/MapLoader";

const RADAR_MAPS_URL = process.env.NEXT_PUBLIC_RADAR_MAPS_URL;
const OSM_TILE_URL = process.env.NEXT_PUBLIC_OSM_TILE_URL;
const WEATHER_TILE_URL = process.env.NEXT_PUBLIC_WEATHER_TILE_URL;

const getMostRecentWeatherMap = async () => {
  const res = await fetch(RADAR_MAPS_URL);
  const resJson = await res.json();
  return resJson.radar.nowcast[0].path;
};

const WeatherMap = ({ weatherData }) => {
  const [mostRecentWeatherMap, setMostRecentWeatherMap] = useState(null);
  const [latitude, setLatitude] = useState(weatherData.coord.lat); 
  const [longitude, setLongitude] = useState(weatherData.coord.lon);

  useEffect(() => {
    (async () => {
      const path = await getMostRecentWeatherMap();
      setMostRecentWeatherMap(path);
    })();
  }, []);

  if (!mostRecentWeatherMap) {
    return <MapLoader />;
  }

  return (
    <Box
      sx={{
        width: '100%', // Adjust to fit within the parent Box
        height: 'auto', // Allow height to adjust based on content
        backgroundColor: 'black', // Set background color to black
        borderRadius: '16px', // Set border radius for curved corners
        padding: '10px', // Set padding to 10px from all corners
        color: 'white', // Set text color to white for contrast
        display: 'flex',
        flexDirection: 'column', // Stack children vertically
        marginTop:'10px'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#B0BEC5' }}>
          {weatherData.name} WEATHER RADAR
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: '#B0BEC5', marginY: 2 }} /> {/* Horizontal gray line */}
      
      <Box
        sx={{
          height: '60vh', // Adjust the height as needed
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden', // Ensures the map fits within the Box's rounded corners
        }}
      >
        <Suspense fallback={<MapLoader />}>
          <MapContainer
            center={[latitude, longitude]}
            zoom={5}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url={OSM_TILE_URL} />
            <TileLayer
              attribution="RainViewer.com"
              url={`${WEATHER_TILE_URL}${mostRecentWeatherMap}/256/{z}/{x}/{y}/2/1_1.png`}
              opacity={0.6}
              zIndex={2}
            />
          </MapContainer>
        </Suspense>
      </Box>
    </Box>
  );
};

export default WeatherMap;
