import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Chip,
  Snackbar
} from '@mui/material';

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

import { careerAPI } from '../../api';

const CareerAdmin = () => {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    position: '',
    department: '',
    description: '',
    requirements: [''],
    location: '',
    employmentType: 'full-time',
    salaryRange: { min: '', max: '' },
    applicationDeadline: '',
    isActive: true
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const res = await careerAPI.getAllAdmin();
      // Handle different response structures
      const careerData = res.data?.data || res.data || [];
      setCareers(Array.isArray(careerData) ? careerData : []);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.data?.message || 'Failed to fetch career opportunities');
      setCareers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (career = null) => {
    if (career) {
      setEditingCareer(career);
      setFormData({
        position: career.position || '',
        department: career.department || '',
        description: career.description || '',
        requirements: career.requirements?.length ? career.requirements : [''],
        location: career.location || '',
        employmentType: career.employmentType || 'full-time',
        salaryRange: career.salaryRange || { min: '', max: '' },
        applicationDeadline: career.applicationDeadline
          ? new Date(career.applicationDeadline).toISOString().split('T')[0]
          : '',
        isActive: career.isActive === true || career.isActive === 'true'
      });
    } else {
      setEditingCareer(null);
      setFormData({
        position: '',
        department: '',
        description: '',
        requirements: [''],
        location: '',
        employmentType: 'full-time',
        salaryRange: { min: '', max: '' },
        applicationDeadline: '',
        isActive: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCareer(null);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('salaryRange.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        salaryRange: {
          ...prev.salaryRange,
          [key]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleRequirementChange = (index, value) => {
    const updated = [...formData.requirements];
    updated[index] = value;
    setFormData(prev => ({ ...prev, requirements: updated }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index) => {
    if (formData.requirements.length > 1) {
      setFormData(prev => ({
        ...prev,
        requirements: prev.requirements.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.position.trim()) {
      setError('Position is required');
      return;
    }
    if (!formData.department.trim()) {
      setError('Department is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const payload = {
        position: formData.position.trim(),
        department: formData.department.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        employmentType: formData.employmentType,
        isActive: formData.isActive === true,
        requirements: formData.requirements.filter(r => r.trim() !== ''),
        salaryRange: (formData.salaryRange.min || formData.salaryRange.max) ? {
          min: formData.salaryRange.min || undefined,
          max: formData.salaryRange.max || undefined
        } : undefined,
        applicationDeadline: formData.applicationDeadline ? new Date(formData.applicationDeadline) : null
      };

      let response;
      if (editingCareer) {
        response = await careerAPI.update(editingCareer._id, payload);
        setSuccess('Career updated successfully!');
      } else {
        response = await careerAPI.create(payload);
        setSuccess('Career created successfully!');
      }

      console.log('API Response:', response);
      
      await fetchCareers(); // Refresh the list
      handleCloseDialog();
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.response?.data?.message || 'Failed to save career opportunity');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this career opportunity? This action cannot be undone.')) return;
    
    try {
      await careerAPI.delete(id);
      setSuccess('Career deleted successfully!');
      await fetchCareers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Failed to delete career opportunity');
      setTimeout(() => setError(''), 3000);
    }
  };

  const getEmploymentTypeColor = (type) => {
    switch (type) {
      case 'full-time': return 'success';
      case 'part-time': return 'info';
      case 'contract': return 'warning';
      case 'internship': return 'secondary';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess('')}>
          {success}
        </Alert>
      </Snackbar>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/dashboard')}
        >
          Dashboard
        </Button>

        <Typography variant="h4" fontWeight={600}>
          Career Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ bgcolor: '#01796F', '&:hover': { bgcolor: '#025F54' } }}
        >
          Add Career
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {careers.length === 0 && !error && (
        <Alert severity="info" sx={{ mb: 2 }}>
          No career opportunities found. Click "Add Career" to create one.
        </Alert>
      )}

      {careers.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Position</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Deadline</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {careers.map((career) => (
                <TableRow key={career._id}>
                  <TableCell>{career.position}</TableCell>
                  <TableCell>{career.department}</TableCell>
                  <TableCell>{career.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={career.employmentType}
                      color={getEmploymentTypeColor(career.employmentType)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={career.isActive ? 'Active' : 'Inactive'}
                      color={career.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {career.applicationDeadline
                      ? new Date(career.applicationDeadline).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(career)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(career._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" fontWeight={600}>
            {editingCareer ? 'Edit Career' : 'Add New Career'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Position *"
            name="position"
            value={formData.position}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Department *"
            name="department"
            value={formData.department}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Location *"
            name="location"
            value={formData.location}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description *"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <Typography sx={{ mt: 2, mb: 1, fontWeight: 600 }}>Requirements</Typography>
          {formData.requirements.map((req, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                value={req}
                onChange={(e) => handleRequirementChange(i, e.target.value)}
                placeholder={`Requirement ${i + 1}`}
              />
              <Button
                color="error"
                onClick={() => removeRequirement(i)}
                disabled={formData.requirements.length === 1}
                variant="outlined"
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button onClick={addRequirement} variant="outlined" sx={{ mt: 1 }}>
            + Add Requirement
          </Button>

          <FormControl fullWidth margin="normal">
            <InputLabel>Employment Type *</InputLabel>
            <Select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              label="Employment Type *"
            >
              <MenuItem value="full-time">Full Time</MenuItem>
              <MenuItem value="part-time">Part Time</MenuItem>
              <MenuItem value="contract">Contract</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="date"
            label="Application Deadline"
            name="applicationDeadline"
            value={formData.applicationDeadline}
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
                color="success"
              />
            }
            label="Active (Visible to public)"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={submitting}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={submitting}
            sx={{ bgcolor: '#01796F', '&:hover': { bgcolor: '#025F54' } }}
          >
            {submitting ? <CircularProgress size={24} /> : (editingCareer ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CareerAdmin;