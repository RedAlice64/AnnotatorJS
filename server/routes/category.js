const express = require('express');
const router = express.Router();
const google_storage = require('@google-cloud/storage')();

const bucket = google_storage.bucket('sereneti-bucket');

/* GET api listing. */
router.get('/', (req, res) => {
  const file = bucket.file('ingredient_list.json');
  file.download().then(data => {
    const content = data[0];
    res.send(new Buffer(content).toString());
  });
});

module.exports = router;
