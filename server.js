var express = require('express'),
	multer = require('multer'),
	bodyParser = require('body-parser'),
	path = require('path');

var app = new express();
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/')
  },
  filename: function (req, file, cb) {
    // file
    /*{ 
      fieldname: 'file',
      originalname: 'photo.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg' 
    }*/
    var ext = file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
  }
})
var upload = multer({ storage: storage });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index');
});

app.post('/', upload.single('file'), function(req, res){
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	/* example output:
            { fieldname: 'upl',
              originalname: 'grumpy.png',
              encoding: '7bit',
              mimetype: 'image/png',
              destination: './uploads/',
              filename: '436ec561793aa4dc475a88e84776b1b9',
              path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
              size: 277056 }
	 */
	res.status(200).render('index', {filename: req.file.filename});
});

app.use('/public', express.static(__dirname + '/public'));

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() { console.log('Listening on '+PORT+'...') })