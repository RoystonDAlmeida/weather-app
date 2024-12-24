'use client';

import { useEffect, useState, Suspense } from "react";
import Header from "../Components/Header";
import { Typography } from "@mui/material"; // Import Typography from Material-UI
import { Box, Button, Card, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import LocationCard from "../Components/LocationCard";
import Link from "next/link";
import LoadingSkeleton from "../Components/LoadingSkeleton";
import DeleteIcon from '@mui/icons-material/Delete'; // Import Material-UI Delete icon
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar for notifications

export default function SavedLocations() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false); // State for dialog open/close
    const [locationToDelete, setLocationToDelete] = useState(null); // Location to delete
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(''); // State for Snackbar message
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // State for Snackbar severity

    useEffect(() => {
        const fetchSavedLocations = async () => {
            try {
                const response = await fetch('/api/fetchsavedLocations');
                if (!response.ok) {
                    throw new Error('Failed to fetch saved locations');
                }
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error('Error fetching saved locations:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSavedLocations(); // Call the function to fetch saved locations
    }, []); // Empty dependency array means this effect runs once on mount

    // Function to delete a location
    const deleteLocation = async () => {
        if (!locationToDelete) return;

        try {
            const { country, location } = locationToDelete;
            console.log(country, location);
            const response = await fetch(`/api/deletesavedLocation?country=${encodeURIComponent(country)}&location=${encodeURIComponent(location)}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete location');
            }

            // Refresh the saved locations after deletion
            window.location.reload(); // Refresh the page to get updated locations

            setSnackbarMessage('Saved Location deleted successfully!'); // Set success message
            setSnackbarSeverity('success'); // Set severity to success
        } catch (error) {
            console.error('Error deleting location:', error);
            setError(error.message);
            setSnackbarMessage(`Error: ${error.message}`); // Set error message
            setSnackbarSeverity('error'); // Set severity to error
        } finally {
            setSnackbarOpen(true); // Open Snackbar
            handleCloseDialog(); // Close the dialog after action
        }
    };

    const handleOpenDialog = (country, location) => {
        setLocationToDelete({ country, location });
        setDialogOpen(true); // Open confirmation dialog
    };

    const handleCloseDialog = () => {
        setDialogOpen(false); // Close confirmation dialog
        setLocationToDelete(null); // Reset location to delete
    };

    return (
        <div>
            <Header />
            <Typography 
                variant="h4" 
                sx={{
                    marginTop: '20px',  // Add some top margin
                    color: '#white',     // Change color (primary blue)
                    transition: 'color 0.3s ease', // Smooth transition for color change
                    '&:hover': {
                        color: '#FF6347', // Change color on hover (Tomato)
                    },
                }}
            >
                View Saved Locations
            </Typography>

            {loading && <Typography>Loading...</Typography>}
            
            {/* Show error message if any */}
            {error && <Typography color="error">Error: {error}</Typography>}

            {/* Check if loading is complete before checking locations */}
            {!loading && (
                <Box sx={{ marginTop: 2, width:'50%', mx:'auto' }}>
                    <Suspense fallback={<LoadingSkeleton/>}>
                        {locations.length === 0 ? (  // Check if there are no saved locations
                            <Typography variant="h6" sx={{ textAlign: 'center', color: 'white' }}>
                                No saved locations found.
                            </Typography>
                        ) : (
                            locations.map((loc, index) => (
                                <Card key={index} sx={{ marginBottom:'10px', backgroundColor:'black', borderRadius:'8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Link href={`/weather-forecast/${encodeURIComponent(loc.country.toLowerCase())}/${encodeURIComponent(loc.name.toLowerCase())}`}>
                                            <LocationCard location={loc}/>
                                        </Link>
                                    </Box>
                                    <IconButton 
                                        onClick={(event) => {
                                            event.stopPropagation();  // Prevent Link click event
                                            handleOpenDialog(loc.country, loc.name);
                                        }} 
                                        color="error" 
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Card>
                            ))
                        )}
                    </Suspense>
                </Box>
            )}

            {/* Confirmation Dialog */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to delete the saved location ({locationToDelete?.location}, {locationToDelete?.country})?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteLocation} color="error">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for success or error notification */}
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                autoHideDuration={3000} // Automatically close after 3 seconds
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position of the snackbar
                ContentProps={{
                    style: {
                        backgroundColor: snackbarSeverity === 'success' ? '#4caf50' : '#f44336', // Green for success, Red for error
                    },
                }}
            />

        </div> 
    );
}
