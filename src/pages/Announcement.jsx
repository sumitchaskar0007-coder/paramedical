import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    Chip,
    Alert,
    CircularProgress,
    Grid,
    Button,
    IconButton,
    CardActions,
    Divider
} from '@mui/material';
import { 
    Announcement as AnnouncementIcon,
    CalendarToday as CalendarIcon,
    AccessTime as TimeIcon,
    PriorityHigh as PriorityIcon,
    ExpandMore as ExpandMoreIcon,
    Download as DownloadIcon
} from '@mui/icons-material';
import { announcementAPI } from '../api';

const Announcement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedAnnouncements, setExpandedAnnouncements] = useState({});

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
  try {
    setError('');
    const response = await announcementAPI.getAll();
    setAnnouncements(response.data); // ✅ backend controlled
  } catch (err) {
    setError('Failed to fetch announcements');
  } finally {
    setLoading(false);
  }
};

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'default';
        }
    };

    const toggleExpand = (id) => {
        setExpandedAnnouncements(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: 'calc(100vh - 80px)',
                pt: '80px'
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        // Main container with top margin for navbar
        <Box sx={{ 
            pt: '80px', // Creates space below the fixed navbar
            minHeight: '100vh',
            bgcolor: 'background.default'
        }}>
            <Container maxWidth="lg">
                <Box sx={{ py: 6 }}>
                    {/* Header Section - Updated with #01796F background */}
                    <Box sx={{ 
                        textAlign: 'center', 
                        mb: 6,
                        px: { xs: 2, md: 0 },
                        py: 6,
                        background: 'linear-gradient(135deg, #01796F 0%, #025F54 100%)',
                        borderRadius: 3,
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Optional subtle pattern overlay */}
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)',
                            zIndex: 0
                        }} />
                        
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <AnnouncementIcon 
                                sx={{ 
                                    fontSize: 64, 
                                    mb: 2,
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                                }} 
                            />
                            <Typography 
                                variant="h2" 
                                gutterBottom 
                                sx={{ 
                                    fontWeight: 700,
                                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                            >
                                Announcements
                            </Typography>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    mb: 4, 
                                    maxWidth: 600, 
                                    mx: 'auto',
                                    opacity: 0.95
                                }}
                            >
                                Stay updated with the latest news, events, and important information from our institution
                            </Typography>
                            
                            <Paper 
                                elevation={0} 
                                sx={{ 
                                    p: 3, 
                                    bgcolor: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 2,
                                    maxWidth: 800,
                                    mx: 'auto',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                <Typography variant="body1">
                                    <strong>Important:</strong> Please check this page regularly for updates regarding classes, events, deadlines, and other institutional information.
                                </Typography>
                            </Paper>
                        </Box>
                    </Box>

                    {error && (
                        <Alert 
                            severity="error" 
                            sx={{ mb: 4, mx: { xs: 2, md: 0 } }}
                            action={
                                <Button color="inherit" size="small" onClick={fetchAnnouncements}>
                                    Retry
                                </Button>
                            }
                        >
                            {error}
                        </Alert>
                    )}

                    {announcements.length === 0 ? (
                        <Paper 
                            elevation={0} 
                            sx={{ 
                                p: 6, 
                                textAlign: 'center',
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                                maxWidth: 600,
                                mx: 'auto',
                                border: '2px solid #01796F',
                                borderTop: '6px solid #01796F'
                            }}
                        >
                            <AnnouncementIcon sx={{ fontSize: 48, color: '#01796F', mb: 2 }} />
                            <Typography variant="h5" gutterBottom sx={{ color: '#01796F' }}>
                                No Active Announcements
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                There are currently no announcements to display. Please check back later for updates.
                            </Typography>
                        </Paper>
                    ) : (
                        <Grid container spacing={3}>
                            {/* Announcements List */}
                            <Grid item xs={12} md={8}>
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#01796F' }}>
                                        <PriorityIcon sx={{ mr: 1, color: '#01796F' }} />
                                        Latest Updates
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        {announcements.length} announcement{announcements.length !== 1 ? 's' : ''} found
                                    </Typography>
                                </Box>

                                {announcements.map((announcement) => {
                                    const isExpanded = expandedAnnouncements[announcement._id];
                                    const isExpired = announcement.endDate && new Date(announcement.endDate) < new Date();

                                    return (
                                        <Card 
                                            key={announcement._id} 
                                            sx={{ 
                                                mb: 3,
                                                borderLeft: `4px solid ${
                                                    announcement.priority === 'high' ? '#f44336' :
                                                    announcement.priority === 'medium' ? '#ff9800' : '#4caf50'
                                                }`,
                                                opacity: isExpired ? 0.7 : 1,
                                                borderTop: '2px solid #01796F',
                                                '&:hover': {
                                                    boxShadow: '0 8px 32px rgba(1, 121, 111, 0.1)'
                                                }
                                            }}
                                            elevation={1}
                                        >
                                            <CardContent>
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    mb: 2,
                                                    flexWrap: 'wrap',
                                                    gap: 2
                                                }}>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#01796F' }}>
                                                            {announcement.title}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                                            <Chip 
                                                                icon={<PriorityIcon />}
                                                                label={announcement.priority.toUpperCase()}
                                                                color={getPriorityColor(announcement.priority)}
                                                                size="small"
                                                            />
                                                            {isExpired && (
                                                                <Chip 
                                                                    label="EXPIRED"
                                                                    color="default"
                                                                    size="small"
                                                                    variant="outlined"
                                                                    sx={{ borderColor: '#ff6b6b', color: '#ff6b6b' }}
                                                                />
                                                            )}
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center',
                                                        bgcolor: 'rgba(1, 121, 111, 0.1)',
                                                        p: 1,
                                                        borderRadius: 1
                                                    }}>
                                                        <CalendarIcon fontSize="small" sx={{ mr: 1, color: '#01796F' }} />
                                                        <Typography variant="caption" sx={{ color: '#01796F', fontWeight: 500 }}>
                                                            {formatDate(announcement.createdAt)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                
                                                <Typography 
                                                    variant="body1" 
                                                    sx={{ 
                                                        mb: 2, 
                                                        whiteSpace: 'pre-line',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: isExpanded ? 'unset' : 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        lineHeight: 1.8
                                                    }}
                                                >
                                                    {announcement.content}
                                                </Typography>

                                                <Divider sx={{ my: 2 }} />

                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                    gap: 2
                                                }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <CalendarIcon fontSize="small" sx={{ color: '#01796F' }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            Posted: {formatDateTime(announcement.createdAt)}
                                                        </Typography>
                                                    </Box>
                                                    
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        {announcement.endDate && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <TimeIcon fontSize="small" sx={{ color: '#01796F' }} />
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Valid until: {formatDate(announcement.endDate)}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                        
                                                        <Button
                                                            size="small"
                                                            endIcon={<ExpandMoreIcon sx={{ 
                                                                transform: isExpanded ? 'rotate(180deg)' : 'none',
                                                                transition: 'transform 0.3s'
                                                            }} />}
                                                            onClick={() => toggleExpand(announcement._id)}
                                                            sx={{
                                                                color: '#01796F',
                                                                '&:hover': {
                                                                    bgcolor: 'rgba(1, 121, 111, 0.04)'
                                                                }
                                                            }}
                                                        >
                                                            {isExpanded ? 'Show Less' : 'Read More'}
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </Grid>

                            {/* Sidebar */}
                            <Grid item xs={12} md={4}>
                                <Card elevation={1} sx={{ 
                                    mb: 3, 
                                    position: 'sticky', 
                                    top: 100,
                                    borderTop: '4px solid #01796F'
                                }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#01796F' }}>
                                            <CalendarIcon sx={{ mr: 1, color: '#01796F' }} />
                                            Quick Stats
                                        </Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Active Announcements:
                                            </Typography>
                                            <Typography variant="h4" sx={{ color: '#01796F' }}>
                                                {announcements.filter(a => !a.endDate || new Date(a.endDate) >= new Date()).length}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                High Priority:
                                            </Typography>
                                            <Typography variant="h6" color="error">
                                                {announcements.filter(a => a.priority === 'high').length}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                This Month:
                                            </Typography>
                                            <Typography variant="h6" sx={{ color: '#01796F' }}>
                                                {announcements.filter(a => {
                                                    const announcementDate = new Date(a.createdAt);
                                                    const now = new Date();
                                                    return announcementDate.getMonth() === now.getMonth() && 
                                                           announcementDate.getFullYear() === now.getFullYear();
                                                }).length}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>

                                <Card elevation={1} sx={{ borderTop: '4px solid #01796F' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ color: '#01796F' }}>
                                            📢 Stay Connected
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 2 }}>
                                            For urgent matters, please contact:
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1, color: '#01796F' }}>
                                            • Administration Office
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1, color: '#01796F' }}>
                                            • Student Affairs Department
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#01796F' }}>
                                            • Academic Coordinator
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button 
                                            fullWidth 
                                            variant="contained"
                                            startIcon={<DownloadIcon />}
                                            sx={{ 
                                                mt: 1,
                                                bgcolor: '#01796F',
                                                '&:hover': {
                                                    bgcolor: '#025F54'
                                                }
                                            }}
                                        >
                                            Download All
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default Announcement;