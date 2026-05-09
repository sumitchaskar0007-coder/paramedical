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
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Tabs,
    Tab,
    Chip,
    AppBar,
    Toolbar,
    Snackbar,
    LinearProgress
} from '@mui/material';

import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Videocam as VideoIcon,
    Image as ImageIcon,
    Dashboard as DashboardIcon,
    CloudUpload as CloudUploadIcon,
    PlayCircle as PlayCircleIcon
} from '@mui/icons-material';

import { galleryAPI } from '../../api';

const GalleryAdmin = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [tabValue, setTabValue] = useState('upload');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'general',
        mediaType: 'image',
        uploadType: 'upload',
        externalUrl: '',
        media: null
    });

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const fetchGalleryItems = async () => {
        try {
            setLoading(true);
            const res = await galleryAPI.getAll();
            setGalleryItems(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to fetch gallery items');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title || '',
                description: item.description || '',
                category: item.category || 'general',
                mediaType: item.mediaType || 'image',
                uploadType: item.uploadType || 'upload',
                externalUrl: item.externalUrl || '',
                media: null
            });
            setTabValue(item.uploadType || 'upload');
            setPreviewUrl(item.mediaUrl);
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                description: '',
                category: 'general',
                mediaType: 'image',
                uploadType: 'upload',
                externalUrl: '',
                media: null
            });
            setTabValue('upload');
            setPreviewUrl(null);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingItem(null);
        setFormData({
            title: '',
            description: '',
            category: 'general',
            mediaType: 'image',
            uploadType: 'upload',
            externalUrl: '',
            media: null
        });
        setTabValue('upload');
        setPreviewUrl(null);
        setError('');
        setUploadProgress(0);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setFormData(prev => ({ 
            ...prev, 
            uploadType: newValue,
            media: null,
            externalUrl: ''
        }));
        setPreviewUrl(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const isVideo = file.type.startsWith('video/');
            const isImage = file.type.startsWith('image/');
            
            if (!isVideo && !isImage) {
                setError('Please select an image or video file');
                return;
            }
            
            if (isVideo && file.size > 100 * 1024 * 1024) {
                setError('Video file size should be less than 100MB');
                return;
            }
            
            if (isImage && file.size > 10 * 1024 * 1024) {
                setError('Image file size should be less than 10MB');
                return;
            }
            
            setFormData(prev => ({ 
                ...prev, 
                media: file,
                mediaType: isVideo ? 'video' : 'image'
            }));
            
            // Create preview URL
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            
            // Clean up old preview URL on next file change
            return () => URL.revokeObjectURL(url);
        }
    };

    const simulateProgress = () => {
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + 10;
            });
        }, 500);
        return interval;
    };

    const handleSubmit = async () => {
        // Validation
        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }

        if (formData.uploadType === 'url' && !formData.externalUrl.trim()) {
            setError('URL is required for URL upload');
            return;
        }

        if (formData.uploadType === 'upload' && !formData.media && !editingItem) {
            setError('Please select a file to upload');
            return;
        }

        setUploading(true);
        setError('');
        
        let progressInterval = null;
        if (formData.uploadType === 'upload' && formData.media) {
            progressInterval = simulateProgress();
        }

        try {
            const data = new FormData();
            data.append('title', formData.title.trim());
            data.append('description', formData.description.trim());
            data.append('category', formData.category);
            data.append('mediaType', formData.mediaType);
            data.append('uploadType', formData.uploadType);
            
            if (formData.uploadType === 'url') {
                data.append('externalUrl', formData.externalUrl.trim());
            } else if (formData.media) {
                data.append('media', formData.media);
            }

            let response;
            if (editingItem) {
                response = await galleryAPI.update(editingItem._id, data);
                setSuccess('Gallery item updated successfully!');
            } else {
                response = await galleryAPI.create(data);
                setSuccess('Gallery item added successfully!');
            }

            console.log('API Response:', response.data);
            
            if (progressInterval) clearInterval(progressInterval);
            setUploadProgress(100);
            
            setTimeout(() => {
                fetchGalleryItems();
                handleCloseDialog();
                setTimeout(() => setSuccess(''), 3000);
            }, 500);
            
        } catch (err) {
            console.error('Submit error:', err);
            console.error('Error response:', err.response);
            setError(err.response?.data?.message || 'Failed to save gallery item');
            if (progressInterval) clearInterval(progressInterval);
            setUploadProgress(0);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        
        try {
            await galleryAPI.delete(id);
            setSuccess('Gallery item deleted successfully!');
            await fetchGalleryItems();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error('Delete error:', err);
            setError('Failed to delete gallery item');
        }
    };

    const handleBackToDashboard = () => {
        window.location.href = '/admin/dashboard';
    };

    // Helper to render media preview
    const renderMediaPreview = (url, type) => {
        if (!url) return null;
        
        if (type === 'video') {
            return (
                <video
                    src={url}
                    style={{
                        width: '100%',
                        maxHeight: 200,
                        objectFit: 'contain',
                        borderRadius: 8,
                        marginTop: 8
                    }}
                    controls
                    muted
                />
            );
        } else {
            return (
                <img
                    src={url}
                    alt="Preview"
                    style={{
                        width: '100%',
                        maxHeight: 200,
                        objectFit: 'contain',
                        borderRadius: 8,
                        marginTop: 8
                    }}
                />
            );
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
                        Gallery Management
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
            
            <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h4" fontWeight={600}>
                        Gallery Items ({galleryItems.length})
                    </Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />} 
                        onClick={() => handleOpenDialog()}
                    >
                        Add New
                    </Button>
                </Box>

                <Snackbar 
                    open={!!success} 
                    autoHideDuration={6000} 
                    onClose={() => setSuccess('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="success" onClose={() => setSuccess('')}>
                        {success}
                    </Alert>
                </Snackbar>

                {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}

                {galleryItems.length === 0 && !error && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                        No gallery items found. Click "Add New" to upload images or videos.
                    </Alert>
                )}

                {galleryItems.length > 0 && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Preview</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Upload Type</TableCell>
                                    <TableCell>Date Added</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {galleryItems.map(item => (
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            {item.mediaType === 'video' ? (
                                                <Box sx={{ width: 80, height: 80, position: 'relative', bgcolor: '#000', borderRadius: 1, overflow: 'hidden', cursor: 'pointer' }}>
                                                    <video
                                                        src={item.mediaUrl}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                        muted
                                                    />
                                                    <PlayCircleIcon 
                                                        sx={{ 
                                                            position: 'absolute', 
                                                            top: '50%', 
                                                            left: '50%', 
                                                            transform: 'translate(-50%, -50%)',
                                                            color: 'white',
                                                            fontSize: 40,
                                                            opacity: 0.8
                                                        }} 
                                                    />
                                                </Box>
                                            ) : (
                                                <img
                                                    src={item.mediaUrl}
                                                    alt={item.title}
                                                    style={{
                                                        width: 80,
                                                        height: 80,
                                                        objectFit: 'cover',
                                                        borderRadius: 1
                                                    }}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/80?text=Error';
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {item.mediaType === 'video' ? <VideoIcon fontSize="small" /> : <ImageIcon fontSize="small" />}
                                                {item.mediaType === 'video' ? 'Video' : 'Image'}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={item.category} 
                                                size="small" 
                                                color={item.category === 'events' ? 'primary' : item.category === 'activities' ? 'secondary' : 'default'}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={item.uploadType === 'upload' ? 'Uploaded' : 'External URL'} 
                                                size="small" 
                                                color={item.uploadType === 'upload' ? 'primary' : 'secondary'}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleOpenDialog(item)} size="small">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(item._id)} size="small">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                    <DialogTitle>
                        {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Title *"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            margin="normal"
                            required
                            autoFocus
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={3}
                        />
                        
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                label="Category"
                            >
                                <MenuItem value="events">Events</MenuItem>
                                <MenuItem value="activities">Activities</MenuItem>
                                <MenuItem value="general">General</MenuItem>
                            </Select>
                        </FormControl>

                        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2, mt: 2 }}>
                            <Tab value="upload" label="📁 Upload File" />
                            <Tab value="url" label="🔗 Use URL" />
                        </Tabs>

                        {tabValue === 'upload' ? (
                            <Box>
                                <FormControl component="fieldset" margin="normal">
                                    <FormLabel component="legend">Media Type (auto-detected)</FormLabel>
                                    <RadioGroup
                                        row
                                        name="mediaType"
                                        value={formData.mediaType}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="image" control={<Radio />} label="Image" disabled={!!formData.media} />
                                        <FormControlLabel value="video" control={<Radio />} label="Video" disabled={!!formData.media} />
                                    </RadioGroup>
                                    <Typography variant="caption" color="text.secondary">
                                        Type is automatically detected from the file you upload
                                    </Typography>
                                </FormControl>

                                <input
                                    accept="image/*,video/*"
                                    style={{ display: 'none' }}
                                    id="media-file-input"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="media-file-input">
                                    <Button 
                                        variant="outlined" 
                                        component="span" 
                                        fullWidth 
                                        startIcon={<CloudUploadIcon />}
                                        sx={{ mt: 2 }}
                                    >
                                        {formData.media ? 'Change File' : `Select Image or Video (Max: ${formData.mediaType === 'video' ? '100MB' : '10MB'})`}
                                    </Button>
                                </label>
                                
                                {formData.media && (
                                    <Typography variant="body2" sx={{ mt: 1, color: 'success.main' }}>
                                        Selected: {formData.media.name} ({(formData.media.size / 1024 / 1024).toFixed(2)} MB)
                                    </Typography>
                                )}
                                
                                {!formData.media && editingItem && (
                                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                                        Current media will be kept if no new file is selected
                                    </Typography>
                                )}

                                {(previewUrl || (editingItem && !formData.media)) && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="subtitle2" gutterBottom>Preview:</Typography>
                                        {renderMediaPreview(previewUrl || editingItem?.mediaUrl, formData.mediaType || editingItem?.mediaType)}
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            <TextField
                                fullWidth
                                label="Media URL *"
                                name="externalUrl"
                                value={formData.externalUrl}
                                onChange={handleChange}
                                margin="normal"
                                placeholder="https://example.com/image.jpg or https://example.com/video.mp4"
                                helperText="Enter direct URL to image or video (must be publicly accessible)"
                            />
                        )}

                        {uploading && (
                            <Box sx={{ mt: 2 }}>
                                <LinearProgress variant="determinate" value={uploadProgress} />
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                    Uploading... {uploadProgress}%
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleCloseDialog} disabled={uploading}>Cancel</Button>
                        <Button 
                            variant="contained" 
                            onClick={handleSubmit}
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : (editingItem ? 'Update' : 'Add')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default GalleryAdmin;