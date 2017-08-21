const express = require('express');
const xml2js = require('xml2js');
const google_storage = require('@google-cloud/storage')();

const router = express.Router();

const bucket = google_storage.bucket('sereneti-bucket');




/* GET api listing. */
router.post('/', (req,res) => {
  const name = req.body.filename;
  const content = req.body.content;
  const file = bucket.file(name);
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(content);

  file.save(xml, (err) => {
    if(err){
      res.send('failed');
    } else {
      res.send('success');
    }
  });
});

module.exports = router;
