const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const file = req.file;
  const { originalname, mimetype, size } = file;

  // Return json object of file metadata
  res.json({
    name: originalname,
    type: mimetype,
    size: size,
  });

  console.log(file);
});

// Basic config
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
