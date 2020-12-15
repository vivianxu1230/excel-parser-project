const readXlsxFile = require('read-excel-file/node');

//setting up schema for the excel parsing library to convert .xlsx file to a json object
const schema = {
  datetime: {
    prop: 'datetime',
    type: Date,
  },
  country: {
    prop: 'country',
    type: String,
  },
  city: {
    prop: 'city',
    type: String,
  },
  state: {
    prop: 'state',
    type: String,
  },
  shape: {
    prop: 'shape',
    type: String,
  },
  comments: {
    prop: 'comments',
    type: String,
  },
};

async function parseFile(path) {
  try {
    const result = await readXlsxFile(path, { schema });
    return result;
  } catch (err) {
    console.log(err);
  }
}

module.exports = parseFile;
