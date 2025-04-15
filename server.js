const express = require('express');

const app = express();
app.get('/', (req, res) => { res.send('Hello world!') });
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/about.html')
});
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found.' });
});
app.listen(3000, () => { console.log("Server running on http://localhost:3000") });