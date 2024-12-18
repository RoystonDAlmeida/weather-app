import { Box, Typography, Divider } from "@mui/material";
import { getLocalTimeByCountryCode } from "@/app/utils/timeZoneUtils";
import Image from "next/image";
import WindInfo from "./WindInfo";

export default function CurrentWeather({ weatherData }){

    // Extract the country code
    const countryCode = weatherData.sys.country;

    // Extract the weatherIcon
    const weatherIcon = weatherData.weather[0].icon;

    // Extract the weather description
    const weatherDescription = weatherData.weather[0].main;

    // Extract the temperature
    const temperature = Math.round(weatherData.main.temp);

    let localTimeString;

    try {
        localTimeString = getLocalTimeByCountryCode(countryCode); 
    } catch (error) {
        console.error(error.message);
        localTimeString = "Timezone not found"; 
    }

    return (
        <>
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
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#B0BEC5' }}>CURRENT WEATHER</Typography> {/* Gray heading */}
                <Typography variant="body1" sx={{ color: 'white' }}>{localTimeString}</Typography> {/* Local time in white */}
            </Box>
            <Divider sx={{ backgroundColor: '#B0BEC5', marginTop: 1 }} /> {/* Horizontal gray line */}
            <Box
            sx={{
                display: 'flex', // Use Flexbox layout
                alignItems: 'center', // Align items vertically centered
                color: 'white', // Text color
            }}
        >
            {weatherIcon && (
                <Image 
                    src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} 
                    alt="Weather Icon" 
                    width={60} 
                    height={60} 
                />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 1, width:'100%' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
                    <span style={{ display: 'inline-block', verticalAlign: 'baseline' }}>
                        {temperature}°
                    </span>
                    <span style={{ color: '#B0BEC5', fontSize: '1.25rem', display: 'inline-block', verticalAlign: 'baseline', marginLeft: '2px' }}>
                        C   
                    </span>
                </Typography>
                <Box sx={{ marginLeft:'auto' }}> {/* Aligns the WindInfo component to the right */}
                    <WindInfo wind={weatherData.wind} />
                </Box>
            </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: '8px' }}>
             <Typography variant="body1" sx={{  color: '#B0BEC5', marginLeft: 1 }} > 
                <span style={{ display: 'inline-block', verticalAlign: 'baseline' }}> 
                    Feels like: {Math.round(weatherData.main.feels_like)}° 
                </span> 
                <span style={{ color: '#B0BEC5', fontSize: '1rem', display: 'inline-block', verticalAlign: 'baseline'}} > 
                    C 
                </span> 
            </Typography> 
            <Typography variant="body1" sx={{ marginLeft: 1 }}> 
                {weatherDescription} 
            </Typography> 
        </Box>
        </Box>
        </>
    );
}