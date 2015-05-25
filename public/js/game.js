$(function(){

	changeVerb();

	$("#game .answer").hide();

	$("#gamecheck").click(function(e){
		e.preventDefault();
		var infinitive = $("#game #infinitive").text();
		var type = $("#game #conjugationtype").attr("rel");
		var conj = $("#game #conjugation").val();
		checkAnswer(infinitive,type,conj.toLowerCase(),function(result){
			var highestTimeoutId = setTimeout(";");
			for (var i = 0 ; i < highestTimeoutId ; i++) {
			    clearTimeout(i); 
			}
			if(result == true){
				$("#game .answer").hide();
				var correct = $("#game .correct");
				correct.show();
				setTimeout(function(){
					correct.fadeOut();
				},5000);
				changeVerb();
			}else{
				$("#game .answer").hide();
				// $("#game .incorrect").show();
				var incorrect = $("#game .incorrect");
				incorrect.show();
				setTimeout(function(){
					incorrect.fadeOut();
				},5000);
			}
			
		});
	})


});

var displayType = {
	"je": "Je",
	"tu": "Tu",
	"ilelleon": "Il / Elle / On",
	"nous": "Nous",
	"vous": "Vous",
	"ilselles": "Ils / Elles"
}

function changeVerb(){
	$.get('/getverbs',function(verbsObj){
		var verbs = Object.keys(verbsObj);
		var length = verbs.length;

		console.log(verbs);

		var verbIndex = Math.floor(Math.random() * length);
		console.log(verbs[verbIndex]);

		var verb = verbs[verbIndex];

		var conjIndex = Math.floor(Math.random() * 6);
		var conj = Object.keys(verbsObj[verb])[conjIndex];

		$("#game #infinitive").empty().html(verb);
		$("#game #conjugationtype").empty().html(displayType[conj]);
		$("#game #conjugationtype").attr("rel",conj);

		$("#game .game-form").trigger("reset");

 	});
}

function checkAnswer(infinitive,type,conj,callback){

	$.get('/getverbs',function(verbsObj){
		if(conj == verbsObj[infinitive][type]){
			console.log(true);
			callback(true);
		}else{
			console.log(false);
			callback(false);
		}
	});

}