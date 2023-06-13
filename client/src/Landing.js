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
        console.log(data.summary);
        setSummary(data.summary); 
        // Here you would handle the summarized text.
      }).catch(error => console.log('Error:', error));
      
  };

//   return (
//     <div>
//       <textarea value={text} onChange={e => setText(e.target.value)} />
//       <select value={summaryLength} onChange={e => setSummaryLength(e.target.value)}>
//         <option value={"short"}>Short</option>
//         <option value={"medium"}>Medium</option>
//         <option value={"long"}>Long</option>
//       </select>
//       <select value={format} onChange={e => setFormat(e.target.value)}>
//         <option value="paragraph">Paragraph</option>
//         <option value="bullets">Bullet Points</option>
//       </select>
//       <button onClick={summarize}>Summarize</button>
//       <p>{summary}</p> {/* Display the summary */}
//     </div>
//   );
    return(
        <Container maxWidth="lg" style={{height: '100vh'}}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="summary-length-label">Size of Summary</InputLabel>
              <Select
                labelId="summary-length-label"
                id="summary-length-select"
                value={summaryLength}
                onChange={e => setSummaryLength(e.target.value)}
              >
                <MenuItem value={'Short'}>Short</MenuItem>
                <MenuItem value={'Medium'}>Medium</MenuItem>
                <MenuItem value={'Long'}>Long</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="summary-format-label">Style of Summary</InputLabel>
              <Select
                labelId="summary-format-label"
                id="summary-format-select"
                value={format}
                onChange={e => setFormat(e.target.value)}
              >
                <MenuItem value={'Paragraph'}>Paragraph</MenuItem>
                <MenuItem value={'Bullets'}>Bullets</MenuItem>
              </Select>
            </FormControl>
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
              {summary}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    )
};

export default Landing;
