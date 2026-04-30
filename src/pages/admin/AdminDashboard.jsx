import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Box,
    IconButton
} from '@mui/material';

import {
    Image as ImageIcon,
    Announcement as AnnouncementIcon,
    Work as WorkIcon,
    Logout as LogoutIcon,
    ArrowBack as ArrowBackIcon,
    Lock as LockIcon,
    Article as ArticleIcon  // ✅ NEW ICON FOR BLOG
} from '@mui/icons-material';

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Logout Handler
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // ✅ match Private.jsx
        navigate("/admin/login");
    };

    const dashboardItems = [
        {
            title: 'Gallery Management',
            description: 'Manage gallery images and categories',
            icon: <ImageIcon fontSize="large" />,
            link: '/admin/gallery',
            color: '#1976d2'
        },
        {
            title: 'Announcements',
            description: 'Create and manage announcements',
            icon: <AnnouncementIcon fontSize="large" />,
            link: '/admin/announcement',
            color: '#2e7d32'
        },
        {
            title: 'Career Opportunities',
            description: 'Manage job postings and applications',
            icon: <WorkIcon fontSize="large" />,
            link: '/admin/career',
            color: '#ed6c02'
        },
        {
            title: 'Blog Management',
            description: 'Create, edit and manage blog posts',
            icon: <ArticleIcon fontSize="large" />,
            link: '/admin/blogs',
            color: '#9c27b0'  // Purple color for blog
        },
       {
        title: 'Private Documents',
        description: 'Access secured PDFs & confidential files',
        icon: <LockIcon fontSize="large" />,
        link: '/private-login',   // ✅ updated
        color: '#6a1b9a'
    }
    ];

    return (
        <Container maxWidth="lg">

            {/* Top Bar */}
            <Box sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                mt: 4,
                mb: 3
            }}>
                <IconButton component={Link} to="/" color="primary">
                    <ArrowBackIcon />
                </IconButton>

                <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
                    Admin Dashboard
                </Typography>

                <Button 
                    variant="contained"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>

            <Grid container spacing={3}>
                {dashboardItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6
                            }
                        }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    mb: 2, 
                                    color: item.color 
                                }}>
                                    {item.icon}
                                    <Typography variant="h5" sx={{ ml: 2, fontWeight: 600 }}>
                                        {item.title}
                                    </Typography>
                                </Box>
                                <Typography color="textSecondary" variant="body2">
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    size="medium"
                                    component={Link}
                                    to={item.link}
                                    sx={{ 
                                        color: item.color,
                                        fontWeight: 600,
                                        '&:hover': {
                                            backgroundColor: `${item.color}10`  // Light background on hover
                                        }
                                    }}
                                >
                                    Manage
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Quick Stats/Info Section (Optional) */}
            <Box sx={{ mt: 6, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                    Dashboard Overview
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Manage all your website content from this dashboard. Each section provides tools to create, edit, and organize content for your website visitors.
                </Typography>
            </Box>
        </Container>
    );
};

export default AdminDashboard;