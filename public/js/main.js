$(function(){

	// /mobile/i.test(navigator.userAgent) && !location.hash && setTimeout(function () {   window.scrollTo(0, 1); }, 1000);​

	// window.scrollTo(0, 1);

	$("#btn-add-verb").click(function(e){
		e.preventDefault();
		var add = $.post('/addVerb',{
			"password": $("#password").val(),
			"infinitive": $("#infinitive").val(),
			"conj_je": $("#conj_je").val(),
			"conj_tu": $("#conj_tu").val(),
			"conj_ilelleon": $("#conj_ilelleon").val(),
			"conj_nous": $("#conj_nous").val(),
			"conj_vous": $("#conj_vous").val(),
			"conj_ilselles": $("#conj_ilselles").val()
		},function(result){
			messagesClient.addMessage("Present tense conjugation for verb " + $("#infinitive").val() + " added","info",null,3000);
			$(".addverb").trigger("reset");
		});
		add.fail(function(xhr,textStatus,errorThrown){
			console.log("xhr",xhr);
			console.log("textStatus",textStatus);
			console.log("errorThrown",errorThrown);
			messagesClient.addMessage(xhr.responseJSON.error,"error",null,3000);
			$(".addverb").trigger("reset");
		})
	})


});