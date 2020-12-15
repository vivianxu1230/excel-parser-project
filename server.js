const express = require('express');
const bodyParser = require('body-parser');
const client = require('./seed');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET request
app.get('/api/sightings', async (req, res) => {
  const result = await client.query('SELECT * from ufosightings');
  res.json(result.rows);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
