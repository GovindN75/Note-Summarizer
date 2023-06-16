import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Select, MenuItem, InputLabel, FormControl, Grid } from '@mui/material';

const Landing = () => {
  const [text, setText] = useState('');
  const [summaryLength, setSummaryLength] = useState("long");
  const [format, setFormat] = useState('paragraph');
  const [summary, setSummary] = useState('');

  const summarize = () => {
    fetch('http://localhost:5000/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text, summary_length: summaryLength, format: format }),
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSummary(data); 
      })
      .catch(error => console.log('Error:', error));

      
  };

  const bulletRender = () => {
    if(format == "Bullets" && summary.length > 0){
      return (
          <ul style={{ paddingLeft: 0, marginLeft: 0 }}>
          {summary.map((item, index) => (
            <li style={{ listStyleType: 'none', textAlign: 'left' }} key={index}>{item}</li>
          ))}
        </ul>
      );
    } else {
      return <p>{summary[0]}</p>;
    }
  }

    return(
      <Container maxWidth="lg" style={{height: '100vh', marginTop: '5em'}}>
        <p>Please note that if the input is over 500 words, it may take longer to retrive a summary.</p>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="summary-length-label">Size of Summary</InputLabel>
                  <Select
                    labelId="summary-length-label"
                    id="summary-length-select"
                    value={summaryLength}
                    onChange={e => setSummaryLength(e.target.value)}
                    style={{marginTop: '5px'}}
                  >
                    <MenuItem value={'Short'}>Short</MenuItem>
                    <MenuItem value={'Medium'}>Medium</MenuItem>
                    <MenuItem value={'Long'}>Long</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="summary-format-label">Style of Summary</InputLabel>
                  <Select
                    labelId="summary-format-label"
                    id="summary-format-select"
                    value={format}
                    onChange={e => setFormat(e.target.value)}
                    style={{marginTop: '5px'}}
                  >
                    <MenuItem value={'Paragraph'}>Paragraph</MenuItem>
                    <MenuItem value={'Bullets'}>Bullets</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="text"
              label="Text to Summarize"
              name="text"
              autoFocus
              value={text}
              onChange={e => setText(e.target.value)}
              multiline
              rows={10}
              maxRows={12}
              style={{resize: "vertical"}}
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={summarize}
            >
              Summarize
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              {bulletRender()}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    )
};

export default Landing;
