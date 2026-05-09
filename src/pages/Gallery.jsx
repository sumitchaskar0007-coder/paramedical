import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
  IconButton
} from "@mui/material";
import { Close, PlayCircle, YouTube, Videocam } from "@mui/icons-material";
import { galleryAPI } from "../api";

const CARD_WIDTH = 320;
const CARD_HEIGHT = 380;
const IMAGE_BOX_SIZE = 260;
const CONTENT_HEIGHT = 120;

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [vimeoThumbnails, setVimeoThumbnails] = useState({});

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await galleryAPI.getAll();
      const galleryData = Array.isArray(res.data) ? res.data : [];
      setItems(galleryData);
      
      // Fetch Vimeo thumbnails asynchronously
      galleryData.forEach(async (item) => {
        if (item.mediaType === 'video' && item.externalUrl && item.externalUrl.includes('vimeo.com')) {
          const thumbnail = await getVimeoThumbnail(item.externalUrl);
          if (thumbnail) {
            setVimeoThumbnails(prev => ({
              ...prev,
              [item._id]: thumbnail
            }));
          }
        }
      });
      
      setError("");
    } catch (err) {
      console.error("Gallery fetch error:", err);
      setError("Failed to load gallery");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaClick = (item) => {
    setSelectedMedia(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMedia(null);
  };

  // Extract YouTube video ID from any YouTube URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&?#]+)/,
      /youtube\.com\/shorts\/([^&?#]+)/,
      /youtube\.com\/live\/([^&?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  // Get YouTube thumbnail URL
  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null;
  };

  // Get Vimeo video ID
  const getVimeoVideoId = (url) => {
    if (!url) return null;
    const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  // Get Vimeo thumbnail
  const getVimeoThumbnail = async (url) => {
    const videoId = getVimeoVideoId(url);
    if (videoId) {
      try {
        const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
        const data = await response.json();
        if (data && data[0] && data[0].thumbnail_large) {
          return data[0].thumbnail_large;
        }
      } catch (error) {
        console.error("Failed to fetch Vimeo thumbnail:", error);
      }
    }
    return null;
  };

  // Get thumbnail URL for video
  const getVideoThumbnail = (item) => {
    // If we have a Vimeo thumbnail in state, use it
    if (item.externalUrl && item.externalUrl.includes('vimeo.com') && vimeoThumbnails[item._id]) {
      return vimeoThumbnails[item._id];
    }
    
    // If backend already provided thumbnail, use it
    if (item.thumbnailUrl && !item.thumbnailUrl.includes('placeholder')) {
      return item.thumbnailUrl;
    }
    
    // For YouTube videos
    if (item.externalUrl && (item.externalUrl.includes('youtube.com') || item.externalUrl.includes('youtu.be'))) {
      const thumbnail = getYouTubeThumbnail(item.externalUrl);
      if (thumbnail) return thumbnail;
    }
    
    // Default fallback
    return "https://via.placeholder.com/400x300?text=Video+Thumbnail";
  };

  // Get embed URL for videos
  const getEmbedUrl = (url) => {
    if (!url) return null;
    
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      }
    }
    
    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = getVimeoVideoId(url);
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
      }
    }
    
    // Direct video file
    if (url && url.match(/\.(mp4|webm|mov|avi|mkv)$/i)) {
      return url;
    }
    
    return url;
  };

  // Check if URL is from external platform
  const isExternalVideo = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com'));
  };

  // Handle image error
  const handleImageError = (e, item) => {
    if (item.externalUrl && item.externalUrl.includes('youtube.com')) {
      const videoId = getYouTubeVideoId(item.externalUrl);
      if (videoId) {
        e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        return;
      }
    }
    e.target.src = 'https://via.placeholder.com/400x300?text=Video+Thumbnail';
  };

  // Render video player in dialog
  const renderVideoPlayer = (item) => {
    const videoUrl = item.externalUrl || item.mediaUrl;
    const embedUrl = getEmbedUrl(videoUrl);
    
    if (!embedUrl) {
      return (
        <Box sx={{ p: 4, textAlign: 'center', color: 'white' }}>
          <Typography>Unable to load video. Invalid URL.</Typography>
        </Box>
      );
    }
    
    if (isExternalVideo(videoUrl)) {
      // For YouTube, Vimeo - use iframe
      return (
        <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            src={embedUrl}
            title={item.title || 'Video'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          />
        </Box>
      );
    } else {
      // For direct video files - use video tag
      return (
        <video
          src={item.mediaUrl}
          controls
          autoPlay
          playsInline
          style={{
            width: '100%',
            maxHeight: '80vh',
            display: 'block'
          }}
          poster={getVideoThumbnail(item)}
        >
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  // Render card preview (thumbnail)
  const renderCardPreview = (item) => {
    if (item.mediaType === 'video') {
      const thumbnail = getVideoThumbnail(item);
      const isExtVideo = isExternalVideo(item.externalUrl || item.mediaUrl);
      const isYouTube = item.externalUrl && (item.externalUrl.includes('youtube.com') || item.externalUrl.includes('youtu.be'));
      
      return (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={thumbnail}
            alt={item.title || 'Video thumbnail'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => handleImageError(e, item)}
          />
          
          {/* Play button overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isExtVideo && isYouTube ? (
              <YouTube sx={{ fontSize: 60, color: 'white', opacity: 0.9 }} />
            ) : (
              <PlayCircle sx={{ fontSize: 60, color: 'white', opacity: 0.9 }} />
            )}
          </Box>
          
          {/* Platform badge */}
          {isExtVideo && (
            <Chip
              label={item.externalUrl?.includes('youtube.com') ? 'YouTube' : item.externalUrl?.includes('vimeo.com') ? 'Vimeo' : 'External'}
              size="small"
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                zIndex: 2,
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                '& .MuiChip-label': { color: 'white' }
              }}
            />
          )}
        </Box>
      );
    } else {
      // For images
      return (
        <img
          src={item.mediaUrl}
          alt={item.title || 'Gallery image'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
          }}
        />
      );
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 12, mb: 6, py: 4 }}>
      <Typography variant="h4" align="center" fontWeight={700} sx={{ mb: 4 }}>
        Campus Gallery
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {items.length === 0 && !error && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No gallery items found. Check back later for photos and videos!
        </Alert>
      )}

      <Grid container spacing={3} justifyContent="center">
        {items.map((item) => (
          <Grid item key={item._id}>
            <Card
              sx={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                borderRadius: 3,
                overflow: "hidden",
                transition: "0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                }
              }}
              onClick={() => handleMediaClick(item)}
            >
              <Box
                sx={{
                  width: IMAGE_BOX_SIZE,
                  height: IMAGE_BOX_SIZE,
                  mx: "auto",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: '#f5f5f5'
                }}
              >
                {renderCardPreview(item)}
              </Box>

              <CardContent sx={{ height: CONTENT_HEIGHT, px: 2 }}>
                <Typography fontWeight={600} noWrap>
                  {item.title || 'Untitled'}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mt: 0.5
                  }}
                >
                  {item.description || 'No description'}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Chip
                    label={(item.category || 'general').toUpperCase()}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    icon={item.mediaType === 'video' ? <Videocam /> : null}
                    label={item.mediaType === 'video' ? 'VIDEO' : 'IMAGE'}
                    size="small"
                    variant="outlined"
                    color={item.mediaType === 'video' ? 'secondary' : 'primary'}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Media Preview Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#000',
            maxWidth: '90vw',
            maxHeight: '90vh'
          }
        }}
      >
        {selectedMedia && (
          <DialogContent sx={{ p: 0, position: 'relative', bgcolor: '#000' }}>
            <IconButton
              onClick={handleCloseDialog}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 1000,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
              }}
            >
              <Close />
            </IconButton>
            
            {selectedMedia.mediaType === 'video' ? (
              renderVideoPlayer(selectedMedia)
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <img
                  src={selectedMedia.mediaUrl}
                  alt={selectedMedia.title || 'Gallery image'}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                  }}
                />
              </Box>
            )}
            
            <Box sx={{ p: 3, bgcolor: '#fff' }}>
              <Typography variant="h5" gutterBottom>
                {selectedMedia.title || 'Untitled'}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {selectedMedia.description || 'No description'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                <Chip label={selectedMedia.category || 'general'} color="primary" />
                <Chip 
                  label={selectedMedia.mediaType === 'video' ? 'Video' : 'Image'} 
                  variant="outlined"
                />
                <Chip 
                  label={selectedMedia.uploadType === 'upload' ? 'Uploaded' : 'External URL'} 
                  variant="outlined"
                />
                {selectedMedia.platform && (
                  <Chip 
                    label={selectedMedia.platform} 
                    variant="outlined"
                    color="secondary"
                  />
                )}
              </Box>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Container>
  );
};

export default Gallery;