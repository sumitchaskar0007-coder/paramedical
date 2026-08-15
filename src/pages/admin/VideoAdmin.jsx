import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, AppBar, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, LinearProgress, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import { Add, ArrowBack, Delete, Edit, VideoLibrary } from '@mui/icons-material';
import { videoAPI } from '../../api';

const emptyForm = { title: '', description: '', sourceType: 'link', videoUrl: '', file: null };

const VideoAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });

  const loadVideos = async () => {
    try { const { data } = await videoAPI.getAll(); setVideos(Array.isArray(data) ? data : []); }
    catch { setMessage({ type: 'error', text: 'Could not load videos.' }); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadVideos(); }, []);

  const closeDialog = () => { if (!saving) { setOpen(false); setEditing(null); setForm(emptyForm); setProgress(0); } };
  const startCreate = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const startEdit = (video) => { setEditing(video); setForm({ title: video.title, description: video.description || '', sourceType: video.sourceType, videoUrl: video.sourceType === 'link' ? video.videoUrl : '', file: null }); setOpen(true); };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return setMessage({ type: 'error', text: 'Title is required.' });
    if (form.sourceType === 'link' && !form.videoUrl.trim()) return setMessage({ type: 'error', text: 'Video link is required.' });
    if (form.sourceType === 'upload' && !form.file && (!editing || editing.sourceType !== 'upload')) return setMessage({ type: 'error', text: 'Select a video file.' });
    const body = new FormData();
    body.append('title', form.title.trim()); body.append('description', form.description.trim()); body.append('sourceType', form.sourceType);
    if (form.sourceType === 'link') body.append('videoUrl', form.videoUrl.trim());
    if (form.file) body.append('video', form.file);
    const onProgress = ({ loaded, total }) => total && setProgress(Math.round((loaded * 100) / total));
    try {
      setSaving(true); setMessage({ type: '', text: '' });
      if (editing) await videoAPI.update(editing._id, body, onProgress); else await videoAPI.create(body, onProgress);
      setMessage({ type: 'success', text: editing ? 'Video updated.' : 'Video added.' });
      setOpen(false); setEditing(null); setForm(emptyForm); setProgress(0); await loadVideos();
    } catch (error) { setMessage({ type: 'error', text: error.response?.data?.message || 'Video could not be saved.' }); }
    finally { setSaving(false); }
  };

  const remove = async (video) => {
    if (!window.confirm(`Delete “${video.title}”? This cannot be undone.`)) return;
    try { await videoAPI.delete(video._id); setMessage({ type: 'success', text: 'Video deleted.' }); await loadVideos(); }
    catch (error) { setMessage({ type: 'error', text: error.response?.data?.message || 'Video could not be deleted.' }); }
  };

  return <>
    <AppBar position="static"><Toolbar><IconButton component={Link} to="/admin/dashboard" color="inherit"><ArrowBack /></IconButton><VideoLibrary sx={{ ml: 1, mr: 1 }} /><Typography variant="h6" sx={{ flexGrow: 1 }}>Video Admin</Typography><Button color="inherit" startIcon={<Add />} onClick={startCreate}>Add Video</Button></Toolbar></AppBar>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {message.text && <Alert severity={message.type} onClose={() => setMessage({ type: '', text: '' })} sx={{ mb: 3 }}>{message.text}</Alert>}
      {loading ? <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 250 }}><CircularProgress /></Box> : <TableContainer component={Paper}>
        <Table><TableHead><TableRow><TableCell>Title</TableCell><TableCell>Source</TableCell><TableCell>Added</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead><TableBody>
          {videos.length === 0 && <TableRow><TableCell colSpan={4} align="center">No videos added.</TableCell></TableRow>}
          {videos.map((video) => <TableRow key={video._id}><TableCell><Typography fontWeight={600}>{video.title}</Typography><Typography variant="caption" color="text.secondary">{video.description}</Typography></TableCell><TableCell>{video.sourceType === 'upload' ? 'Uploaded file' : 'External link'}</TableCell><TableCell>{new Date(video.createdAt).toLocaleDateString()}</TableCell><TableCell align="right"><IconButton aria-label="Edit" onClick={() => startEdit(video)}><Edit /></IconButton><IconButton aria-label="Delete" color="error" onClick={() => remove(video)}><Delete /></IconButton></TableCell></TableRow>)}
        </TableBody></Table>
      </TableContainer>}
    </Container>
    <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth component="form" onSubmit={submit}>
      <DialogTitle>{editing ? 'Edit Video' : 'Add Video'}</DialogTitle><DialogContent>
        <TextField autoFocus required fullWidth label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} margin="normal" inputProps={{ maxLength: 200 }} />
        <TextField fullWidth multiline minRows={3} label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} margin="normal" inputProps={{ maxLength: 2000 }} />
        <RadioGroup row value={form.sourceType} onChange={(e) => setForm({ ...form, sourceType: e.target.value, file: null, videoUrl: '' })}><FormControlLabel value="link" control={<Radio />} label="Video link" /><FormControlLabel value="upload" control={<Radio />} label="Upload file" /></RadioGroup>
        {form.sourceType === 'link' ? <TextField required fullWidth type="url" label="Video URL" placeholder="https://..." value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} helperText="YouTube, Vimeo, direct files and other HTTP(S) video links are accepted." margin="normal" /> : <Box sx={{ mt: 2 }}><Button component="label" variant="outlined" fullWidth>Choose video file<input hidden type="file" accept="video/*" onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })} /></Button><Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{form.file?.name || (editing?.sourceType === 'upload' ? 'Keep current file, or choose a replacement.' : 'No file selected.')}</Typography></Box>}
        {saving && <Box sx={{ mt: 3 }}><LinearProgress variant={progress ? 'determinate' : 'indeterminate'} value={progress} /><Typography variant="caption">{progress ? `Uploading ${progress}%` : 'Saving…'} Do not close this window.</Typography></Box>}
      </DialogContent><DialogActions><Button onClick={closeDialog} disabled={saving}>Cancel</Button><Button type="submit" variant="contained" disabled={saving}>{editing ? 'Update' : 'Add Video'}</Button></DialogActions>
    </Dialog>
  </>;
};

export default VideoAdmin;
