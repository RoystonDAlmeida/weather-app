import { Box, Typography } from "@mui/material";

// Hourly Weather Skeleton Component
const HourlyWeatherSkeleton = () => (
    <Box sx={{ padding: 1, textAlign: 'center', backgroundColor: '#1E1E1E', borderRadius: '8px' }}>
        <Typography variant="body1" sx={{ color: 'white' }}>
            <div style={{ height: '20px', backgroundColor: '#B0BEC5', marginBottom: '5px' }} />
            <div style={{ height: '20px', backgroundColor: '#B0BEC5', marginBottom: '5px' }} />
            <div style={{ height: '20px', backgroundColor: '#B0BEC5', marginBottom: '5px' }} />
        </Typography>
    </Box>
);

export default HourlyWeatherSkeleton;