import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Typography,
    Alert,
    CircularProgress,
    Switch,
    FormControlLabel,
    AppBar,
    Toolbar
} from '@mui/material';
import { 
    Add as AddIcon, 
    Edit as EditIcon, 
    Delete as DeleteIcon,
    Dashboard as DashboardIcon
} from '@mui/icons-material';
import { announcementAPI } from '../../api';

const AnnouncementAdmin = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        priority: 'medium',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        isActive: true
    });

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await announcementAPI.getAllAdmin();
            setAnnouncements(response.data);
        } catch (err) {
            setError('Failed to fetch announcements');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (announcement = null) => {
        if (announcement) {
            setEditingAnnouncement(announcement);
            setFormData({
                title: announcement.title,
                content: announcement.content,
                priority: announcement.priority,
                startDate: new Date(announcement.startDate).toISOString().split('T')[0],
                endDate: announcement.endDate 
                    ? new Date(announcement.endDate).toISOString().split('T')[0]
                    : '',
                isActive: announcement.isActive
            });
        } else {
            setEditingAnnouncement(null);
            setFormData({
                title: '',
                content: '',
                priority: 'medium',
                startDate: new Date().toISOString().split('T')[0],
                endDate: '',
                isActive: true
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingAnnouncement(null);
        setFormData({
            title: '',
            content: '',
            priority: 'medium',
            startDate: new Date().toISOString().split('T')[0],
            endDate: '',
            isActive: true
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {
        try {
            const data = {
                title: formData.title,
                content: formData.content,
                priority: formData.priority,
                startDate: formData.startDate,
                endDate: formData.endDate || null,
                isActive: Boolean(formData.isActive)
            };

            if (editingAnnouncement) {
                await announcementAPI.update(editingAnnouncement._id, data);
            } else {
                await announcementAPI.create(data);
            }

            fetchAnnouncements();
            handleCloseDialog();
        } catch (err) {
            setError('Failed to save announcement');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this announcement?')) {
            try {
                await announcementAPI.delete(id);
                fetchAnnouncements();
            } catch (err) {
                setError('Failed to delete announcement');
            }
        }
    };

    const handleBackToDashboard = () => {
        window.location.href = '/admin/dashboard';
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'default';
        }
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <>
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Announcement Management
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<DashboardIcon />}
                        onClick={handleBackToDashboard}
                    >
                        Back to Dashboard
                    </Button>
                </Toolbar>
            </AppBar>
            
            <Container maxWidth="lg" sx={{ mt: 3 }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mb: 3
                }}>
                    <Typography variant="h4">Announcements</Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog()}
                    >
                        Add New
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Priority</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {announcements.map((announcement) => (
                                <TableRow key={announcement._id}>
                                    <TableCell>{announcement.title}</TableCell>
                                    <TableCell>
                                        <Typography color={getPriorityColor(announcement.priority)}>
                                            {announcement.priority.toUpperCase()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(announcement.startDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {announcement.endDate 
                                            ? new Date(announcement.endDate).toLocaleDateString()
                                            : 'N/A'
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {announcement.isActive ? 'Active' : 'Inactive'}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpenDialog(announcement)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(announcement._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                    <DialogTitle>
                        {editingAnnouncement ? 'Edit Announcement' : 'Add Announcement'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={4}
                            required
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Priority</InputLabel>
                            <Select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                label="Priority"
                            >
                                <MenuItem value="high">High</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="low">Low</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Start Date"
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            fullWidth
                            label="End Date (Optional)"
                            name="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                    name="isActive"
                                />
                            }
                            label="Active"
                            sx={{ mt: 1 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained">
                            {editingAnnouncement ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default AnnouncementAdmin;