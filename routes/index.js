var express = require('express');
var router = express.Router();

var candidates = [{id: 32, name: 'Ray'}, {id: 64, name: 'mishra'}];

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/candidates', function(req, res) {
    console.log(req.query);
    res.json(200, { message: 'Hello ' + req.query.name + '!! How do you do?!' });
});

router.post('/candidates', function (req, res) {
    res.json(200, req.body);
});

router.get('/candidates/:index', function(req, res) {
    console.log(req.params.index);
    res.json(200, { candidate: candidates[Number(req.params.index)] });
});


router.get('/candidatePage', function (req, res) {
    res.render('candidates');
});

module.exports = router;
