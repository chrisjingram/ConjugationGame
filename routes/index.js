var express = require('express');
var router = express.Router();

var jsonfile = require("jsonfile");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Conjugation Game', game: true });
});

router.get('/addverb', function(req,res,next){
	res.render("addverb", {title: 'Add Verb Conjugation', game: false});
});

router.post('/addverb', function(req,res,next){
	if(req.body.password != "testpassword"){ // change password here
		res.status(500).json({error: "Incorrect password"});
	}else{
		var file = require('path').join(__dirname + '/../verbs.json');
		console.log(file);
		if(!req.body.infinitive || !req.body.conj_je || !req.body.conj_tu || !req.body.conj_ilelleon || !req.body.conj_nous || !req.body.conj_vous || !req.body.conj_ilselles){
			res.status(500).json({error: "Please fill in the entire description"});
		}else{
			jsonfile.readFile(file,function(err,obj){
				if(obj[req.body.infinitive.toLowerCase()]){
					res.status(500).json({error: "Conjugation already present in system"});
				}else{
					obj[req.body.infinitive.toLowerCase()] = {
						"je": req.body.conj_je.toLowerCase(),
						"tu": req.body.conj_tu.toLowerCase(),
						"ilelleon": req.body.conj_ilelleon.toLowerCase(),
						"nous": req.body.conj_nous.toLowerCase(),
						"vous": req.body.conj_vous.toLowerCase(),
						"ilselles": req.body.conj_ilselles.toLowerCase()
					}
					jsonfile.writeFile(file,obj,function(err){
						console.log(err);
						res.json(obj);
					});
				}
				
			});
		}
	}


});

router.get('/getverbs',function(req,res,next){
	var file = require('path').join(__dirname + '/../verbs.json');
	jsonfile.readFile(file,function(err,obj){
		if(err){
			next(err);
		}else{
			res.json(obj);
		}
	})
});

module.exports = router;
