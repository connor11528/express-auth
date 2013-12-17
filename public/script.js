// start the socket.io connection between the client and the server
var socket = io.connect();

// add a message to the screen with the user’s pseudo
function addMessage(msg, pseudo){
	$('#chatEntries').append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
}

// send a new message
function sentMessage(){
	if($('#messageInput').val() != ""){
		// send package to the server named message that contains the message text
		socket.emit('message', $('#messageInput').val());
		
		// print message to screen
		addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);		
		// remove text from the textarea
		$('#messageInput').val('');
	}
}

// set the user's pseudo
function setPseudo(){
	if ($("#pseudoInput").val() != ""){
		// send pseudo to server
		socket.emit('setPseudo', $("#pseudoInput").val());
		
		// show text area and submit button
		$('#chatControls').show();
		
		// hide pseudo settings controls once pseudo is sent to the server
		$('#pseudoInput').hide();
		$('#pseudoSet').hide();
	}
}

socket.on('message', function(data){
	//  the packet that is sent to the client is an array 
	// containing the message and the pseudo
	addMessage(data['message'], data['pseudo']);
});


// initialization function
$(document).ready(function(){
	$("#chatControls").hide();
	$("#pseudoSet").click(function() { setPseudo(); });
	$("#submit").click(function(){ sentMessage(); });
});

















