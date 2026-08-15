import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Alert, Box, Card, CardContent, CircularProgress, Container, Dialog, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import { Close, PlayArrow } from '@mui/icons-material';
import { videoAPI } from '../api';

const DEFAULT_THUMBNAIL = '/assets/images/default-video-thumbnail.svg';

const getYouTubeThumbnail = (url = '') => {
  try {
    const parsed = new URL(url);
    let id = '';
    if (parsed.hostname === 'youtu.be') id = parsed.pathname.split('/').filter(Boolean)[0];
    if (parsed.hostname.includes('youtube.com')) {
      id = parsed.searchParams.get('v') || parsed.pathname.match(/\/(?:shorts|embed|live)\/([^/?]+)/)?.[1];
    }
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
  } catch {
    return '';
  }
};

const getThumbnail = (video) => video.thumbnailUrl || getYouTubeThumbnail(video.videoUrl) || DEFAULT_THUMBNAIL;

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    videoAPI.getAll().then(({ data }) => setVideos(Array.isArray(data) ? data : []))
      .catch(() => setError('Videos could not be loaded. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box sx={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}><CircularProgress /></Box>;

  return <Container maxWidth="lg" sx={{ mt: 12, mb: 8, py: 4 }}>
    <Typography variant="h3" align="center" fontWeight={700} gutterBottom>Videos</Typography>
    <Typography align="center" color="text.secondary" sx={{ mb: 5 }}>Watch college events, activities and updates.</Typography>
    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
    {!error && videos.length === 0 && <Alert severity="info">No videos have been added yet.</Alert>}
    <Grid container spacing={3}>
      {videos.map((video) => <Grid item xs={12} sm={6} md={4} key={video._id}>
        <Card onClick={() => setSelected(video)} sx={{ height: '100%', cursor: 'pointer', borderRadius: 3, overflow: 'hidden', transition: '.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 7 } }}>
          <Box sx={{ position: 'relative', aspectRatio: '16/9', bgcolor: '#0b3b67' }}>
            <Box
              component="img"
              src={getThumbnail(video)}
              alt={`${video.title} thumbnail`}
              onError={(event) => {
                if (event.currentTarget.src.endsWith(DEFAULT_THUMBNAIL)) return;
                event.currentTarget.src = DEFAULT_THUMBNAIL;
              }}
              sx={{ width: '100%', height: '100%', objectFit: 'contain', bgcolor: '#000' }}
            />
            <Box sx={{ position: 'absolute', inset: 0, m: 'auto', width: 72, height: 72, borderRadius: '50%', bgcolor: '#246bfd', display: 'grid', placeItems: 'center', boxShadow: '0 5px 18px rgba(0,0,0,.35)' }}>
              <PlayArrow sx={{ color: '#fff', fontSize: 42 }} />
            </Box>
          </Box>
          <CardContent><Typography variant="h6" fontWeight={700}>{video.title}</Typography>{video.description && <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{video.description}</Typography>}</CardContent>
        </Card>
      </Grid>)}
    </Grid>
    <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} maxWidth="md" fullWidth>
      {selected && <DialogContent sx={{ p: 0, bgcolor: '#000', position: 'relative' }}>
        <IconButton aria-label="Close video" onClick={() => setSelected(null)} sx={{ position: 'absolute', right: 8, top: 8, zIndex: 2, color: '#fff', bgcolor: 'rgba(0,0,0,.55)' }}><Close /></IconButton>
        <Box sx={{ aspectRatio: '16/9' }}><ReactPlayer src={selected.videoUrl} controls playing width="100%" height="100%" light={getThumbnail(selected)} /></Box>
        <Box sx={{ p: 3, bgcolor: '#fff' }}><Typography variant="h5" fontWeight={700}>{selected.title}</Typography>{selected.description && <Typography color="text.secondary" sx={{ mt: 1 }}>{selected.description}</Typography>}<Typography component="a" href={selected.videoUrl} target="_blank" rel="noreferrer" sx={{ display: 'inline-block', mt: 2 }}>Open original video</Typography></Box>
      </DialogContent>}
    </Dialog>
  </Container>;
};

export default Videos;
