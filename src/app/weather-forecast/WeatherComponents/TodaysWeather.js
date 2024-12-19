import { Box, Divider, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; 
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import formatDate from "@/app/utils/formatDate";

export default function TodaysWeather({ weatherData }){
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
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#B0BEC5' }}>TODAY&apos;S WEATHER</Typography> {/* Gray heading */}
                    <Typography variant="body1" sx={{ color: 'white' }}>{formatDate(new Date(), weatherData.sys.country)}</Typography> {/* Local time in white */}
                </Box>
                <Divider sx={{ backgroundColor: '#B0BEC5', marginTop: 1 }} /> {/* Horizontal gray line */}

                <Box sx={{ display: 'flex', alignItems: 'left', marginTop:'10px' }}>
                    <ArrowDownwardIcon/>
                    <Typography variant="subtitle1" sx={{ color: '#B0BEC5', marginLeft:1 }}>Minimum Temperature:</Typography> {/* Gray heading */}
                    <Typography variant="subtitle1" sx={{ fontWeight:'bold', color: 'gray', marginLeft:1 }}>Min: {Math.round(weatherData.main.temp_min)}°</Typography> {/* Gray heading */}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'left', marginTop:'10px' }}>
                    <ArrowUpwardIcon/>
                    <Typography variant="subtitle1" sx={{ color: '#B0BEC5', marginLeft:1 }}>Maximum Temperature:</Typography> {/* Gray heading */}
                    <Typography variant="subtitle1" sx={{ fontWeight:'bold', color: 'gray', marginLeft:1 }}>Max: {Math.round(weatherData.main.temp_max)}°</Typography> {/* Gray heading */}
                </Box>
            </Box>
    );
}