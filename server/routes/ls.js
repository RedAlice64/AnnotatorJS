const express = require('express');
const router = express.Router();
const google_storage = require('@google-cloud/storage')();

const bucket = google_storage.bucket('sereneti-bucket');

/* GET api listing. */
router.get('/', (req, res) => {
  const category = req.query.category;
  let file_list = [];
  bucket.getFiles(
    {
      prefix:'ingredients-dataset/'+category+'/Images/'
    },
    (err, files) => {
    if(!err){
      for(let i = 0;i < files.length; i++){
        file_list.push(files[i].name);
      }
      res.send(file_list);
    } else {
      res.send(JSON.stringify(err));
    }
  });
});

module.exports = router;
