var verbsObj;

$(function(){

	$("#game .answer").hide();

	$.get('/getverbs',function(result){
		
		verbsObj = result;

		changeVerb();

		$("#gamecheck").click(function(e){
			e.preventDefault();
			var infinitive = $("#game #infinitive").text();
			var type = $("#game #conjugationtype").attr("rel");
			var conj = $("#game #conjugation").val();

			var answer = checkAnswer(infinitive,type,conj.toLowerCase());

			var highestTimeoutId = setTimeout(";");
			for (var i = 0 ; i < highestTimeoutId ; i++) {
			    clearTimeout(i); 
			}

			if(answer == true){
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

	});

	


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

		var verbs = Object.keys(verbsObj);
		var length = verbs.length;

		var verbIndex = Math.floor(Math.random() * length);

		var verb = verbs[verbIndex];

		var conjIndex = Math.floor(Math.random() * 6);
		var conj = Object.keys(verbsObj[verb])[conjIndex];

		$("#game #infinitive").empty().html(verb);
		$("#game #conjugationtype").empty().html(displayType[conj]);
		$("#game #conjugationtype").attr("rel",conj);

		$("#game .game-form").trigger("reset");

}

function checkAnswer(infinitive,type,conj,callback){
	if(conj == verbsObj[infinitive][type]){
		return true;
	}else{
		return false;
	}
}