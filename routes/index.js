var express = require('express');
var router = express.Router();
var data = require('../contacts').candidates;
var uuid = require('uuid');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/candidates', function(req, res) {
    res.json(200, data);
});

router.get('/candidates/:id', function(req, res) {
    var ids = data.map(function (candidate) {
        return candidate.contactid;
    });
    var index = ids.indexOf(req.params.id);
    if ( index === -1 ) {
        res.json(404, { message: 'data does not exist' });
    } else {
        res.json(200, data[index]);
    }
});

router.post('/candidates', function (req, res) {
    req.body.contactid = uuid.v4();
    data.push(req.body);
    res.json(200, data[data.length - 1]);
});

router.put('/candidates/:id', function (req, res){
    // 1db31e07-4559-4f97-8782-097702e06132
    var ids = data.map(function (candidate) {
        return candidate.contactid;
    });
    var index = ids.indexOf(req.params.id);
    if (index === -1) {
        res.json(404, { message: 'Could not find the candidate with id ' + req.candidate.id })
    } else {
        // update the candidate
        var candidate = data[index];
        for (var prop in req.body) {
            console.log(prop);
            console.log(candidate);
            if (candidate.hasOwnProperty(prop)) {
                candidate[prop] = req.body[prop];
            }
        }
        // send a response
        res.json(200, { message: 'successfully updated data' });
    }
});


router.delete('/candidates/:id', function(req, res) {
    var ids = data.map(function (candidate) {
        return candidate.contactid;
    });
    var index = ids.indexOf(req.params.id);
    if ( index === -1 ) {
        res.json(404, { message: 'candidate does not exist' });
    } else {
        data.splice(index, 1);
        res.json(200, { message: 'deleted candidate ' + req.params.id});
    }
});



router.get('/candidatePage', function (req, res) {
    res.render('candidates');
});

module.exports = router;
