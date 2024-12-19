import { Box, Typography } from "@mui/material";
import Water from "@mui/icons-material/Water";

export default function HourlyWeatherGrid({ hour }){
    return (
        <Box sx={{ padding: 1, textAlign: 'center', backgroundColor: '#1E1E1E', borderRadius: '8px' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                {new Date(hour.time).toLocaleTimeString([], { hour: '2-digit' })}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
                {Math.round(hour.temperature)}°
            </Typography>

            {/* Water icon with precipitation percentage */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Water sx={{ color: 'white', marginBottom: 0.5 }} />
                <Typography variant="body2" sx={{ color: 'white' }}>
                    {hour.precipitation}%
                </Typography>
            </Box>
        </Box>
);
}