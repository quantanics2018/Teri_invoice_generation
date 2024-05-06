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
import { API_URL } from '../config';
import axios from 'axios';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [resAlert, setresAlert] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const userInfoString = sessionStorage.getItem("UserInfo");
  const userInfo = JSON.parse(userInfoString);
  const currentuserId = userInfo.userid;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidfeedback = feedback.trim() !== '';
    if (isValidfeedback) {
      try {
        const response = await axios.post(`${API_URL}add/feedback`, {
          feedback, currentuserId
        });
        if (response.data.status) {
          console.log('Transaction History:', response.data.message);
          setresAlert(response.data.message)
          setSubmitted(true);
          // setData(response.data.data);
        } else {
          setresAlert(response.data.message)
          setSubmitted(true);
        }
      } catch (error) {
        console.error('Failed to Fetch Transaction History:', error.message);
      }
    } else {
      alert("Feedback form cant be empty")
    }
    // console.log('Feedback:', feedback);
    // console.log('Rating:', rating);
    setFeedback('');
    setRating('');
  };

  const handleSnackbarClose = () => {
    setSubmitted(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" style={{userSelect: "none"}} gutterBottom>
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
        {/* <FormControl component="fieldset" margin="normal">
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
        </FormControl> */}
        <Button type="submit" variant="contained" color="primary">
          Submit Feedback
        </Button>
      </form>
      <Snackbar open={submitted} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {resAlert}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default FeedbackForm;
