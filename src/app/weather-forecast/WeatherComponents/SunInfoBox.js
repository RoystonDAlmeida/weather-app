import { Box, Divider, Typography } from "@mui/material";
import { countryTimeZoneMapping } from "@/app/utils/timeZoneUtils";

// Function to convert UNIX timestamp to 24-hour format
const formatTime = (timestamp, weatherData) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

    // Extract the country code from weatherData
    const countryCode = weatherData.sys.country;

    const timeZone = countryTimeZoneMapping[countryCode] || 'UTC'; // Default to UTC if not found

    return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: timeZone,
    });
};

// Function to calculate time difference in hours and minutes
const calculateTimeDifference = (sunrise, sunset) => {
    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);
    
    const diffInMs = sunsetDate - sunriseDate; // Difference in milliseconds
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes
    
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return `${hours}hrs ${minutes}mins`;
};

export default function SunInfoBox({ weatherData }) {
    // Extract sunrise and sunset times from weatherData
    const sunrise = weatherData.sys.sunrise;
    const sunset = weatherData.sys.sunset;

    // Calculate time difference
    const timeDifference = calculateTimeDifference(sunrise, sunset);

    return (
        <Box
            sx={{
                height: 'auto',
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                flexDirection: 'column', // Change to column for top label and divider
                marginTop: '10px',
                marginLeft: '40px',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: 3,
                width: '300px', // Adjust as needed
            }}
        >
            {/* Box for SUN label */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#B0BEC5' }}>SUN</Typography>
            </Box>
            <Divider sx={{ backgroundColor: '#B0BEC5', marginTop: 1 }} />

            {/* Box for Sun icon and time difference */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'lightyellow', marginRight: 2 }}>
                    {timeDifference}
                </Typography>
                
                <Divider orientation="vertical" sx={{ backgroundColor: '#B0BEC5', height: '100px', marginX: 2 }} />
                
                {/* Box for Rise and Set */}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box>
                        <Typography variant="body1" sx={{ color: '#B0BEC5' }}>Rise:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'lightyellow' }}>
                            {formatTime(sunrise, weatherData)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ color: '#B0BEC5' }}>Set:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'lightyellow' }}>
                            {formatTime(sunset, weatherData)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
