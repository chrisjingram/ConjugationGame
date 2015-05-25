var messagesClient = {};

//Function to add a message to the bottom of the screen
//param - content - The content of the message
//param - type - The type of the message ('error' or  'loading')
//param - id - The id of the message
//param - duartion - How long to display the message on screen
messagesClient.addMessage = function(content,type,id,duration){

	var messageID;

	if(id === null){
		messageID = $("#messages").children().length + 1;
	}else{
		messageID = id;
	}

	switch(type){
		case 'loading':
			$("#messages").append("<div id='" + messageID + "' class='message message-info'><p><i class='fa fa-refresh fa-spin'></i>" + content + "</p></div>");
			break;
		case 'error':
			$("#messages").append("<div id='" + messageID + "' class='message message-error'><p><i class='fa fa-exclamation'></i>" + content + "</p></div>");
			break;
		default:
			$("#messages").append("<div id='" + messageID + "' class='message message-" + type + "'><p>" + content + "</p></div>");
			break;
	}

	$("#messages #" + messageID).hide();
	$("#messages #" + messageID).slideDown(function(){
		if(duration != null){
			setTimeout(messagesClient.removeMessage,duration,messageID);
		}
	});

	return messageID;
}

//Remove a message by pulling it down
//param - id - The id of the message
messagesClient.removeMessage = function(id){
	$("#messages #" + id).slideUp(function(){
		$("#messages #" + id).remove();
	});	
}

//Update a message by changing it's content
//param - id - the id of the message
//param - newcontent - the new content
//param - type - the type of message ('error' or 'loading')
messagesClient.updateMessage = function(id,newcontent,type){

	switch(type){
		case 'loading':
			$("#messages #" + id).empty().html("<p><i class='fa fa-refresh fa-spin'></i>" + newcontent + "</p>");
			break;
		case 'error':
			$("#messages #" + id).empty().html("<p><i class='fa fa-exclamation'></i>" + newcontent + "</p></div>");
			break;
		default:
			$("#messages #" + id).empty().html("<p>" + newcontent + "</p>");
			break;
	}

}

//Pull all messages down, removing them all
messagesClient.removeAll = function(){

	$("#messages").empty();

}