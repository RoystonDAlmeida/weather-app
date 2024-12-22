import { Box, Typography } from "@mui/material";
import { getWeatherDescription } from "@/app/utils/weatherUtils";
import Water from "@mui/icons-material/Water";

// Helper function to get day name and formatted date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short' }; // Get short weekday name (e.g., "Sun", "Mon")
    const dayName = date.toLocaleDateString('en-US', options).toUpperCase();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`; // Format dd/mm
    return { dayName, formattedDate };
};

// A component that displays each day's weather forecast within TenDaysWeatherForecast component
export default function NextDayWeatherForecast({ forecast })
{
    const { dayName, formattedDate } = formatDate(forecast.date);

    return(
        <>
            {/* Horizontal Box for a Day's forecast*/}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

            {/* Vertical Box for Date and Formatted Date */}
            <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {dayName === "Today" ? "Today" : dayName}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                    {formattedDate}
                </Typography>
            </Box>

            {/* Horizontal Box for Max and Min temp */}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginLeft: 3, flexGrow: 1, justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', lineHeight: '1' }}>
                    {Math.round(forecast.temperature_max)}°
                </Typography>
                <Typography variant="body1" sx={{ color: 'gray', lineHeight: '1', marginBottom: 0.25 }}>
                    {Math.round(forecast.temperature_min)}°
                </Typography>
            </Box>

            {/* Horizontal Box for weather description (based on weather code) */}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', flexGrow: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white', lineHeight: '1' }}>
                    {getWeatherDescription(forecast.weather_code)}
                </Typography>
            </Box>

            {/* Horizontal Box for precipitation */}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginLeft: 1 }}>
                <Water sx={{ color: 'white' }} />
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white', marginLeft: 1 }}>
                    {forecast.precipitation_sum}%
                </Typography>
            </Box>
        </Box>
        </>
    );
}