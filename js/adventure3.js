/*-----------------------
Game Variables
-----------------------*/
// Set a bunch of initial variables
var message = "You're in a plane etc, in your pocket you have a stick of gum";
var command;
var messageItemUse;
var commandPostVerb;
var commandVerb;
var feedbackMessage;
var altitude = 30000;
var currentRoom = 2;
var gameEnd = false;
var cockpitDoor = false;


// Set arrays
var availableRooms = new Array("cockpit", "galley", "cabin", "bathroom", "cargo hold");
var inventory = new Array();
var visibleItems = new Array();
//var availableItems = new Array("stick of gum", "parachute", "wrench", "fire extinguisher", "cargo net", "length of rope", "flare gun", "loafer", "cn of mountain dew");
var directions = new Array();
//var availableDirections = new Array("forward", "backward", "down")
var total = new Array();

/*-----------------------
Set Starting Items
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
        planeMarker();        
        setRooms();
        dashboard();
        totalCommands();
});







/*-----------------------
Command Input Interface
-----------------------*/
$( "#commandForm" ).submit(function(event) {
		
		// Run functions
        commandHandling();
        negativeFeedback();
        roomMover();
        dashboard();
        planeMarker();        
        setRooms();
        getItem();
        useItem();
        totalCommands();
		updateAltitude();

        event.preventDefault();
});


function commandHandling() {
	// When the form is submitted, grab the value of the input text and set it to variable 'command'
        command = $('#command').val();
        // Set command to lowercase
        command = command.toLowerCase();
        //split command. Look for GET and do what comes after it
        commandVerb = command.split(" ", 1);
        commandPostVerb = command.substr(command.indexOf(" ") + 1);        
} 


function roomMover() {

    if (commandVerb[0] == "move") {
        for (var i = 0; i < directions.length; i++) {
            // Make sure we have a match to an available exit
            if (commandPostVerb == directions[i]) {

                // Clear any negative feedback messages
                feedbackMessage = "";
                $('#feedback-output').html(feedbackMessage);

                if (directions[i] == 'forward' && currentRoom != 0) {

                	// Check for door lock
                	if (cockpitDoor == false && currentRoom == 1) {
                		message = "You try to move forward, but the door is locked";
                		$('messageItemUse-output').html(message);
                	} else {
                		currentRoom = currentRoom - 1;
                        $('#currentRoom-output').html(currentRoom);
                        // Trigger the function to update the plane GUI map
                        planeMarker();
					}


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
}

function setRooms() {
    if (currentRoom == 0) {
            
        // Set story text for cockpit
        message = 'You are standing in the cockpit. The instrument console appears to be destroyed, and The pilot is dead';
        $('#message-output').html(message);

        // available exits
        directions = ['backward'];
		$('#directions-output').html(directions.join(', '));

		// Set and Display initial visible items
        visibleItems = ['flare gun', 'parachute'];
        $('#item-output').html(visibleItems.join(', '));

        // Only show items if they arent already in inventory
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
        
		// Set story text for galley
        message = 'You are standing in the galley. There is a rather empty looking wet bar';
        $('#message-output').html(message);

        // available exits
        directions = ['forward', 'backward'];

        $('#directions-output').html(directions.join(', '));

        // Set and Display initial visible items
        visibleItems = ['can of mountain dew', 'coaster', 'fire extinguisher'];
        $('#item-output').html(visibleItems.join(', '));

        // Only show items if they arent already in inventory
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
		// Set story text for cabin
        message ='This is the message for the cabin. There are couches...and a loafer';
        $('#message-output').html(message);

        // available exits
        directions = ['forward', 'backward'];
		$('#directions-output').html(directions.join(', '));

        // Set and Display initial visible items
        visibleItems = ['skymall catalogue', 'loafer'];
        $('#item-output').html(visibleItems.join(', '));

        // Only show items if they arent already in inventory
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

        // Set story text for bathroom
        message ='You are now in the bathroom. You see a small hatch in the floor';
        $('#message-output').html(message);
        
        directions = ['forward', 'down'];
        $('#directions-output').html(directions.join(', '));

        // Set and Display initial visible items
        visibleItems = ['toilet paper', 'nail clippers'];
        $('#item-output').html(visibleItems.join(', '));

        // Only show items if they arent already in inventory
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
		
		// Set story text for cargo hold
        message ='You climb down the floor hatch into a narrow access tunnel leading to what appears to be the cargo hold. ';
        $('#message-output').html(message);

        // available exits
        directions = ['up'];
		$('#directions-output').html(directions.join(', '));

        // Set and Display initial visible items
        visibleItems = ['cargo net', 'wrench', 'rope'];
        $('#item-output').html(visibleItems.join(', '));

        // Only show items if they arent already in inventory
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
    // Only do this stuff if command is preceded by GET
    if (commandVerb[0] == "get") {
        // Check the visible items array by looping through it
        for (var i = 0; i < visibleItems.length; i++) {
            // Make sure our command matches a visible item
            if (commandPostVerb == visibleItems[i]) {
                // Add visible item to inventory
                inventory.push(visibleItems[i]);

                // Remove the added item from the visible item array
                visibleItems[i] = '';
                $('#inventory-output').html(inventory.join(', '));
                $('#item-output').html(visibleItems.join(', '));
            }
        }
    }
}


function useItem() {
	// Only do this stuff if command is preceded by USE
	if (commandVerb[0] == "use") {
		for (var i = 0; i < inventory.length; i++) {
			if (commandPostVerb == inventory[i]) {

				// Set a message to assist with narrative
				message = "You use the " + inventory[i];

				if (commandPostVerb == "keys" && currentRoom == 1) {
					// Append extra text to message
					message = message + ". The door to the cockpit unlocks and swings open"
					cockpitDoor = true;
				} else {
					message = message + ". You succeed in wasting some time and looking like an idiot"
				}
				// Output the final message to the HTML
				$('#message-output').html(message);
			}
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

function totalCommands() {
	// Compile all arrays into one for testing
	var preTotal = $.merge( $.merge( [], directions ), visibleItems );
	total = $.merge( $.merge( [], preTotal ), inventory );

	$('#totalCommands-output').html(total);
}

function negativeFeedback() {
        // Set negative feedback message for out-of-scope commands
        for (var i = 0; i < total.length; i++) {

                // Check command against all available commands
                if (commandPostVerb == total[i]) {
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

