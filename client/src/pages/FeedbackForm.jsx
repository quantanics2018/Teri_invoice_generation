// FeedbackForm.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback:', feedback);
    console.log('Rating:', rating);
    setFeedback('');
    setRating('');
    setSubmitted(true);
  };

  const handleSnackbarClose = () => {
    setSubmitted(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Feedback Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Your Feedback"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          margin="normal"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <FormControl component="fieldset" margin="normal">
          <Typography variant="subtitle1">Rating</Typography>
          <RadioGroup
            row
            aria-label="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <FormControlLabel key={value} value={value.toString()} control={<Radio />} label={value.toString()} />
            ))}
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit Feedback
        </Button>
      </form>
      <Snackbar open={submitted} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Thank you for your feedback!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default FeedbackForm;
