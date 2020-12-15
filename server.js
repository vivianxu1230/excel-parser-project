const express = require('express');
const bodyParser = require('body-parser');
const client = require('./seed');
const multer = require('multer');
const fs = require('fs');
const parseFile = require('./helpers');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setting up the file upload destination and file name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files');
  },
  filename: function (req, file, cb) {
    cb(null, 'sample-file.xlsx');
  },
});

const upload = multer({ storage: storage }).single('file');

//GET request
app.get('/api/sightings', async (req, res) => {
  const result = await client.query('SELECT * from ufosightings');
  res.json(result.rows);
});

//POST request
app.post('/api/posting', async (req, res) => {
  await upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
  //using a helper function to parse the uploaded file
  let result = await parseFile('public/files/sample-file.xlsx');
  result = result.rows;
  result.forEach(async (entry) => {
    const query = {
      text:
        'INSERT into ufosightings (datetime, country, city, state, shape, comments ) VALUES($1, $2, $3, $4, $5, $6)',
      values: [
        entry.datetime,
        entry.country,
        entry.city,
        entry.state,
        entry.shape,
        entry.comments,
      ],
    };
    await client.query(query);
  });

  //deleting the file in public/files after it is parsed and added to the database
  fs.unlinkSync('public/files/sample-file.xlsx');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
