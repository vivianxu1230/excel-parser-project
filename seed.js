const pg = require('pg');

const client = new pg.Client('postgres://localhost:5432/excel-parser-project');
module.exports = client;

async function initialSeed() {
  try {
    await client.connect();
    await client.query('DROP TABLE IF EXISTS ufosightings');
    await client.query(
      'CREATE TABLE ufosightings (datetime date, country varchar(7), city varchar(50), state char(2), shape varchar(15), comments text)'
    );
    await client.query(
      `INSERT into ufosightings (datetime, country, city, state, shape, comments ) VALUES('12/11/16 18:00', 'USA', 'Detroit', 'MI', 'Light', 'Silver disk seen by family and neighbors.')`
    );
  } catch (err) {
    console.log(err);
  }
}

initialSeed();
