/*-----------------------
Game Variables
-----------------------*/
// Set a bunch of initial variables
var message = "You're in a plane etc, in your pocket you have a stick of gum";
var command;
var feedbackMessage;
var altitude = 30000;
var currentRoom = 2;
var gameEnd = false;

// Set arrays
var availableRooms = new Array("cockpit", "galley", "cabin", "bathroom", "cargo hold");
var inventory = new Array();
var visibleItems = new Array();
var availableItems = new Array("stick of gum", "parachute", "wrench", "fire extinguisher", "cargo net", "length of rope", "flare gun", "loafer", "cn of mountain dew");
var directions = new Array();
var total = new Array();
var availableDirections = new Array("forward", "backward", "down")


/*-----------------------
Set Inventory
-----------------------*/
inventory[0] = "stick of gum";
inventory[1] = "keys";

/*-----------------------
Game Dashboard Output
-----------------------*/
function dashboard() {
	$('#message-output').html(message);
	$('#altitude-output').html(altitude+' Feet');
  	$('#inventory-output').html(inventory.join(', '));
	$('#direction-output').html(directions);
	$('#currentRoom-output').html('You are currently in the '+ availableRooms[currentRoom]);
}



$( document ).ready(function() {
	rooms();
	setItems();
	dashboard();
	totalCommands();


});







/*-----------------------
Command Input Interface
-----------------------*/
$( "#commandForm" ).submit(function(event) {

	// When the form is submitted, grab the value of the input text and set it to variable 'command'
	command = $('#command').val();

	// Print the command to the action output for testing
	$('#action-output').html('You have decided to '+ command);

	negativeFeedback();
	roomMover();
	dashboard();
	planeMarker();	
	rooms();
	setItems();
	getItem();
	totalCommands();
	updateAltitude();

	event.preventDefault();
});




function negativeFeedback() {
	// Set negative feedback message for out-of-scope commands
	
	

	for (var i = 0; i < total.length; i++) {

		// Check command against all available commands
		if (command == total[i]) {
			feedbackMessage = "";
			$('#feedback-output').html(feedbackMessage);
		} else {
			feedbackMessage = "That makes no sense";
			$('#feedback-output').html(feedbackMessage);
		}
	}

	// Set negative feedback message for doing nothing
	if (command == '') {
		feedbackMessage = "You probably shouldn't waste time by doing nothing";
		$('#feedback-output').html(feedbackMessage);
	}
}	


function roomMover() {
	for (var i = 0; i < directions.length; i++) {
		// Make sure we have a match to an available exit
		if (command == directions[i]) {

			// Clear any negative feedback messages
			feedbackMessage = "";
			$('#feedback-output').html(feedbackMessage);

			if (directions[i] == 'forward' && currentRoom != 0) {
				currentRoom = currentRoom - 1;
				$('#currentRoom-output').html(currentRoom);
				// Trigger the function to update the plane GUI map
				planeMarker();
			} else if (directions[i] == 'down') {
				currentRoom = currentRoom + 1;
				$('#currentRoom-output').html(currentRoom);
				// Trigger the function to update the plane GUI map
				planeMarker();
			}else if (directions[i] == 'up') {
				currentRoom = currentRoom - 1;
				$('#currentRoom-output').html(currentRoom);
				// Trigger the function to update the plane GUI map
				planeMarker();
			} else if (directions[i] == 'backward' && currentRoom != 4) {
				currentRoom = currentRoom + 1;
				$('#currentRoom-output').html(currentRoom);
				// Trigger the function to update the plane GUI map
				planeMarker();
			} 
		} 
	}	
}

function setItems() {

	if (currentRoom == 0) {
		
		// Set and Display initial visible items
		visibleItems = ['flare gun', 'parachute'];
		$('#item-output').html(visibleItems.join(', '));

		for (i = 0; i < visibleItems.length; i++) {
			for (j = 0; j < inventory.length; j++) {

				// Test visible items agains inventory
				if (visibleItems[i] == inventory[j]) {
					// You already have the item, clear it from the visible item array
					console.log('match found: ' + visibleItems[i]);
					visibleItems[i] = '';
					// Output visible items again, post-filtering
					$('#item-output').html(visibleItems);
				}
			}
		}
	} else if (currentRoom == 1) {
		
		// Set and Display initial visible items
		visibleItems = ['can of mountain dew', 'coaster', 'fire extinguisher'];
		$('#item-output').html(visibleItems.join(', '));

		for (i = 0; i < visibleItems.length; i++) {
			for (j = 0; j < inventory.length; j++) {

				// Test visible items agains inventory
				if (visibleItems[i] == inventory[j]) {
					// You already have the item, clear it from the visible item array
					console.log('match found: ' + visibleItems[i]);
					visibleItems[i] = '';
					// Output visible items again, post-filtering
					$('#item-output').html(visibleItems);
				}
			}
		}

	} else if (currentRoom == 2) {
	
		// Set and Display initial visible items
		visibleItems = ['skymall catalogue', 'loafer'];
		$('#item-output').html(visibleItems.join(', '));

		for (i = 0; i < visibleItems.length; i++) {
			for (j = 0; j < inventory.length; j++) {

				// Test visible items agains inventory
				if (visibleItems[i] == inventory[j]) {
					// You already have the item, clear it from the visible item array
					console.log('match found: ' + visibleItems[i]);
					visibleItems[i] = '';
					// Output visible items again, post-filtering
					$('#item-output').html(visibleItems);
				}
			}
		}
	} else if (currentRoom == 3) {
	
		// Set and Display initial visible items
		visibleItems = ['toilet paper', 'nail clippers'];
		$('#item-output').html(visibleItems.join(', '));

		for (i = 0; i < visibleItems.length; i++) {
			for (j = 0; j < inventory.length; j++) {

				// Test visible items agains inventory
				if (visibleItems[i] == inventory[j]) {
					// You already have the item, clear it from the visible item array
					console.log('match found: ' + visibleItems[i]);
					visibleItems[i] = '';
					// Output visible items again, post-filtering
					$('#item-output').html(visibleItems);
				}
			}
		}
	} else if (currentRoom == 4) {
	
		// Set and Display initial visible items
		visibleItems = ['cargo net', 'wrench', 'rope'];
		$('#item-output').html(visibleItems.join(', '));

		for (i = 0; i < visibleItems.length; i++) {
			for (j = 0; j < inventory.length; j++) {

				// Test visible items agains inventory
				if (visibleItems[i] == inventory[j]) {
					// You already have the item, clear it from the visible item array
					console.log('match found: ' + visibleItems[i]);
					visibleItems[i] = '';
					// Output visible items again, post-filtering
					$('#item-output').html(visibleItems);
				}
			}
		}
	}
}

function getItem() {
	for (var i = 0; i < visibleItems.length; i++) {
		// Make sure we have a match to a visible item
		if (command == visibleItems[i]) {
			inventory.push(visibleItems[i]);

			// Need to remove item from array
			visibleItems[i] = '';
			$('#inventory-output').html(inventory.join(', '));
			$('#item-output').html(visibleItems.join(', '));
		}
	}
}

/*-----------------------
Set GUI Plane Map 
-----------------------*/
// Cockpit
function planeMarker () {
	if (currentRoom == 0) {
		$('#planeMarker').css('left', '30px');
	// Galley
	} else if (currentRoom == 1) {
		$('#planeMarker').css('left', '65px');
	// Cabin
	} else if (currentRoom == 2) {
		$('#planeMarker').css('left', '130px');
	// Bathroom
	} else if (currentRoom == 3) {
		$('#planeMarker').css('left', '198px');
		$('#plane').css('background-image', "url('images/plane-upper.png')");
	// Below-deck Cargo Hold
	} else {
		$('#plane').css('background-image', "url('images/plane-lower.png')");
		$('#planeMarker').css('left', '235px');
	}
}

function updateAltitude() {
	// Update the altitude
	var altitudeLoss = Math.floor((Math.random()*2000)+500);
	altitude = altitude - altitudeLoss;
	$('#altitude-output').html(altitude+' Feet');
}




///////////// ROOM FUNCTIONS /////////////

function rooms() {
	/*-----------------------
	Room 0 (the cockpit) 
	-----------------------*/
	if (currentRoom == 0) {
		// Set story text for cockpit
		message = 'You are standing in the cockpit. The instrument console appears to be destroyed, and The pilot is dead';
		$('#message-output').html(message);

		// available exits
		directions = ['backward'];

		$('#directions-output').html(directions.join(', '));
	}

	/*-----------------------
	Room 1 (the galley) 
	-----------------------*/
	if (currentRoom == 1) {
		// Set story text for galley
		message = 'You are standing in the galley. There is a rather empty looking wet bar';
		$('#message-output').html(message);

		// available exits
		directions = ['forward', 'backward'];

		$('#directions-output').html(directions.join(', '));
	}

	/*-----------------------
	Room 2 (the cabin) 
	-----------------------*/
	if (currentRoom == 2) {
		// Set story text for cabin
		message ='This is the message for the cabin. There are couches...and a loafer';
		$('#message-output').html(message);

		// available exits
		directions = ['forward', 'backward'];

		//for (var i = 0; i < directions.length; i++) {
			$('#directions-output').html(directions.join(', '));
		//}
	}

	/*-----------------------
	Room 3 (the bathroom) 
	-----------------------*/
	if (currentRoom == 3) {
		// Set story text for bathroom
		message ='You are now in the bathroom. You see a small hatch in the floor';
		$('#message-output').html(message);
		
		directions = ['forward', 'down'];
		$('#directions-output').html(directions.join(', '));
	
	}

	/*-----------------------
	Room 4 (the cargo hold) 
	-----------------------*/
	if (currentRoom == 4) {
		// Set story text for cargo hold
		message ='You climb down the floor hatch into a narrow access tunnel leading to what appears to be the cargo hold. ';
		$('#message-output').html(message);

		// available exits
		directions = ['up'];

		//for (var i = 0; i < directions.length; i++) {
			$('#directions-output').html(directions.join(', '));
		//}
	}
}

function totalCommands() {
	// Compile all arrays into one for testing
	  total = $.merge( $.merge( [], directions ), visibleItems );
	  $('#totalCommands-output').html(total.join(', '));
}

