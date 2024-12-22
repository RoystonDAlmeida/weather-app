import { Box, Divider, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import NextDayWeatherForecast from "./NextDayWeatherForecast";

export default function TenDaysWeatherForecast({ weatherData })
{
    const [tenDaysForecast, setTenDaysForecast] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchtenDaysForecast = async () => {
            try {
                const response = await fetch(`/api/TenDaysWeatherForecast?latitude=${weatherData.coord.lat}&longitude=${weatherData.coord.lon}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setTenDaysForecast(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchtenDaysForecast();
    }, [weatherData]);


    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'black',
                borderRadius: '16px',
                padding: '10px',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px'
            }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#B0BEC5' }}>10-DAY WEATHER FORECAST</Typography>
            </Box>
            <Divider sx={{ backgroundColor: '#B0BEC5', marginTop: 1 }} />

            {error ? (
                <Typography variant="body2" sx={{ color: 'red', marginTop: 2 }}>
                    Error: {error}
                </Typography>
            ) : (
                tenDaysForecast.map((forecast, index) => {

                    return (
                        <Box key={index} sx={{ padding: 1 }}>
                            {/* Display each day's forecast */}
                            <NextDayWeatherForecast forecast= { forecast }/>

                            {index < tenDaysForecast.length - 1 && (
                                <Divider sx={{ backgroundColor: '#B0BEC5', marginY: 1 }} />
                            )}
                        </Box>
                    );
                })
        )}
        </Box>
    );
}