const express = require('express');
const app = express();
const SERVER_PORT = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/hello', (req, res) => {
    res.status(200)
  res.send('Hello Express JS');
});


app.get('/user', (req, res) => {
res.status(200)
  const firstname = req.query.firstname || 'Pritesh';
  const lastname = req.query.lastname || 'Patel';
  res.json({ firstname, lastname });
});


app.post('/user/:firstname/:lastname', (req, res) => {
    console.log(req.params)
    const firstname = req.params.firstname;
    const lastname = req.params.lastname  ;
    res.send(`First Name: ${firstname}, Last Name: ${lastname}`);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});

