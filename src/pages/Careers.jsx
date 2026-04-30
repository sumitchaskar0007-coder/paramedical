import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Snackbar
} from "@mui/material";

import {
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  AccessTime as AccessTimeIcon
} from "@mui/icons-material";

import { careerAPI } from "../api";

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: ""
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const res = await careerAPI.getAll();
      // Handle different response structures
      const careerData = res.data?.data || res.data || [];
      // Filter only active careers (in case backend returns all)
      const activeCareers = Array.isArray(careerData) 
        ? careerData.filter(career => career.isActive === true)
        : [];
      setCareers(activeCareers);
      setError('');
    } catch (error) {
      console.error("Error fetching careers", error);
      setError('Failed to load career opportunities. Please try again later.');
      setCareers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (career) => {
    setSelectedCareer(career);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedCareer(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      coverLetter: ""
    });
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    if (!formData.coverLetter.trim()) {
      setError('Please provide a cover letter');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    
    // Simulate API call for application submission
    // In real scenario, you'd have an applications API endpoint
    setTimeout(() => {
      setSuccessMessage(`Application submitted successfully for ${selectedCareer?.position}! We will contact you soon.`);
      setSubmitting(false);
      handleClose();
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    }, 1000);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#01796F" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ pt: "80px", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      
      {/* Success Message */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={5000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #01796F, #025F54)",
          color: "white",
          py: 10,
          textAlign: "center"
        }}
      >
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Join Our Team
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 600, mx: "auto", opacity: 0.95 }}>
          Build your career with Aditya Educational Foundation's College of Paramedical
        </Typography>
      </Box>

      {/* Career List */}
      <Container sx={{ mt: 6, mb: 8 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {careers.length === 0 && !error && (
          <Alert severity="info" sx={{ mb: 3 }}>
            No active career opportunities available at the moment. Please check back later.
          </Alert>
        )}

        <Grid container spacing={3}>
          {careers.map((career) => (
            <Grid item xs={12} key={career._id}>
              <Card
                sx={{
                  borderLeft: "5px solid #01796F",
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight={700} color="#01796F" gutterBottom>
                    {career.position}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 3, flexWrap: 'wrap', mt: 2, mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <BusinessIcon sx={{ mr: 1, color: "#01796F" }} />
                      <Typography variant="body2">{career.department}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationIcon sx={{ mr: 1, color: "#01796F" }} />
                      <Typography variant="body2">{career.location}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <WorkIcon sx={{ mr: 1, color: "#01796F" }} />
                      <Chip
                        label={career.employmentType?.toUpperCase()}
                        color="success"
                        size="small"
                      />
                    </Box>

                    {career.salaryRange?.min && career.salaryRange?.max && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          Salary: ₹{career.salaryRange.min} - ₹{career.salaryRange.max}
                        </Typography>
                      </Box>
                    )}

                    {career.applicationDeadline && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTimeIcon sx={{ mr: 1, color: "#01796F" }} />
                        <Typography variant="body2" color="text.secondary">
                          Apply by: {new Date(career.applicationDeadline).toLocaleDateString()}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Typography sx={{ mt: 2, color: '#4a5568' }}>
                    {career.description}
                  </Typography>

                  {career.requirements && career.requirements.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Key Requirements:
                      </Typography>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {career.requirements.map((req, idx) => (
                          <li key={idx}>
                            <Typography variant="body2" color="text.secondary">
                              {req}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}

                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 3,
                      bgcolor: "#01796F",
                      "&:hover": { bgcolor: "#025F54" }
                    }}
                    onClick={() => handleApply(career)}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Application Dialog */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h5" fontWeight={600} color="#01796F">
            Apply for {selectedCareer?.position}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {selectedCareer?.department} • {selectedCareer?.location}
          </Typography>
        </DialogTitle>

        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="Full Name *"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Email Address *"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Phone Number *"
            name="phone"
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Cover Letter / Message *"
            name="coverLetter"
            margin="normal"
            multiline
            rows={4}
            value={formData.coverLetter}
            onChange={handleChange}
            required
            placeholder="Why are you interested in this position? What makes you a good fit?"
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#01796F",
              "&:hover": { bgcolor: "#025F54" }
            }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : 'Submit Application'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Careers;