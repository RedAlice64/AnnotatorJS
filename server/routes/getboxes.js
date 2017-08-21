const express = require('express');
const router = express.Router();
const google_storage = require('@google-cloud/storage')();
const xml2js = require('xml2js');

const bucket = google_storage.bucket('sereneti-bucket');
const parser = xml2js.Parser();

/* GET api listing. */
router.get('/', (req, res) => {
  const filename = req.query.filename;
  const file = bucket.file(filename);
  file.download((err, contents) => {
    if(!err) {
      parser.parseString(contents, (err, result) => {
        if(!err) {
          res.send(result);
        }
      });
      //res.send(contents);
    } else {
      res.status(400).send();
    }
  });
});

module.exports = router;
