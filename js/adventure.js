/*-----------------------
Game Variables
-----------------------*/
// Set a bunch of initial variables
var message;
var command;
var messageItemUse;
var commandPostVerb;
var commandVerb;
var feedbackMessage;
var altitude = 30000;
var currentRoom = 2;

// Boolean tests
var gameEnd = false;
var gameWon = false;
var cockpitDoor = false;
var parachute = false;

// Set arrays
var availableRooms = new Array("Cockpit", "Galley", "Cabin", "Bathroom", "Cargo Hold");
var inventory = new Array();
var visibleItems = new Array();
var directions = new Array();
var total = new Array();

// Set Starting Items
inventory[0] = "wrist watch";


/*-----------------------
Onload functions
-----------------------*/
$( document ).ready(function() {
        planeMarker();        
        setRooms();
        display();
        totalCommands();

});


/*-----------------------
Submit functions
-----------------------*/
$( "#commandForm" ).submit(function(event) {
	// Run functions
    
    commandHandling();
    negativeFeedback();
    roomMover();
    planeMarker();        
    setRooms();
    getItem();
    useItem();
    totalCommands();
	updateAltitude();
    display();
    gameStatus();
    event.preventDefault();
});


/*-----------------------
Functions
-----------------------*/
function commandHandling() {
	// When the form is submitted, grab the value of the input text and set it to variable 'command'
    command = $('#command').val();
    // Set command to lowercase
    command = command.toLowerCase();
    //split command. Look for GET and do what comes after it
    commandVerb = command.split(" ", 1);
    commandPostVerb = command.substr(command.indexOf(" ") + 1);        
} 

function display() {
    $('#message-output').html(message);
    $('#altitude-output').html(altitude+' Feet');
    $('#inventory-output').html(inventory.join(', '));
}

function roomMover() {

    if (commandVerb[0] == "move") {
        for (var i = 0; i < directions.length; i++) {
            // Make sure we have a match to an available exit
            if (commandPostVerb == directions[i]) {

                // Clear any negative feedback messages
                feedbackMessage = "";
                message = "";
                $('#feedback-output').html(feedbackMessage);
                $('#messageItemUse-output').html(message);

                if (directions[i] == 'forward' && currentRoom != 0) {

                	// Check for door lock
                	if (cockpitDoor == false && currentRoom == 1) {
                		message = "You try to move forward, but the door is locked";
                		$('#messageItemUse-output').html(message);
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
        message = "You are standing in the " + availableRooms[currentRoom] + ". The instrument console appears to be destroyed, and The pilot is dead";
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
        message = "You are standing in the " + availableRooms[currentRoom] + ". There is a rather empty looking wet bar";
        $('#message-output').html(message);

        // available exits
        directions = ['forward', 'backward'];

        $('#directions-output').html(directions.join(', '));

        // Set and Display initial visible items
        visibleItems = ['can of mountain dew', 'fire extinguisher'];
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
        message = "You are standing in the " + availableRooms[currentRoom] + ". This is the message for the cabin. There are couches...and a loafer";
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
        message = "You are standing in the " + availableRooms[currentRoom] + ". You see a small hatch in the floor";

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
        message = "You climb down the floor hatch into a narrow access tunnel leading to what appears to be the " + availableRooms[currentRoom];
        $('#message-output').html(message);

        // available exits
        directions = ['up'];
		$('#directions-output').html(directions.join(', '));

        // Set and Display initial visible items
        visibleItems = ['cargo net', 'keys'];
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
				message2 = "You use the " + inventory[i];

				if (commandPostVerb == "keys" && currentRoom == 1) {
					// Append extra text to message
					message2 = message2 + ". The door to the cockpit unlocks and swings open"
					cockpitDoor = true;
				} else if (commandPostVerb == "parachute") {
                    message2 = message2 + ". Carefully, you strap the parachute to your back, making sure the buckles are cinched tight"
                    parachute = true;
                } else if (commandPostVerb == "can of mountain dew") {
                    message2 = message2 + ". As you drink it, you hope it gives you the power to take things to the extreme. Instead, you die."
                    gameEnd = true;
                } else if (commandPostVerb == "flare gun") {
                    if (currentRoom == 4) {
                        //you blow a hole in the back of the plane and get sucked out
                        if (parachute == true) {
                            message2 = message2 + " and blow a hole in the back of the plane and get sucked out. Good thing you put on the parachute"
                            gameWon = true;
                        } else {
                            message2 = message2 + " and blow a hole in the back of the plane and get sucked out. As you fall to your death, you regret not drinking the moutain dew"
                        }
                    } else {
                        message2 = message2 + ". There is now a small fire in the "+availableRooms[currentRoom];
                    }
                } else {
					message2 = message2 + ". You succeed in wasting some time and looking like an idiot"
				}
				// Output the final message to the HTML
                $('#messageItemUse-output').html(message2);
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
        $('#planeMarker').css('left', '0px');
        // Grab the name of the room and display it above push pin
        $('#planeMarker').html(availableRooms[currentRoom]);
    // Galley
    } else if (currentRoom == 1) {
        $('#planeMarker').css('left', '35px');
        // Grab the name of the room and display it above push pin
        $('#planeMarker').html(availableRooms[currentRoom]);
    // Cabin
    } else if (currentRoom == 2) {
        $('#planeMarker').css('left', '100px');
        // Grab the name of the room and display it above push pin
        $('#planeMarker').html(availableRooms[currentRoom]);
    // Bathroom
    } else if (currentRoom == 3) {
        $('#planeMarker').css('left', '173px');
        // Swap the plane blueprint to show above deck
        $('#plane').css('background-image', "url('images/plane-upper.png')");
        // Grab the name of the room and display it above push pin
        $('#planeMarker').html(availableRooms[currentRoom]);
    // Below-deck Cargo Hold
    } else {
        // Swap the plane blueprint to show below deck
        $('#plane').css('background-image', "url('images/plane-lower.png')");
        $('#planeMarker').css('left', '205px');
        // Grab the name of the room and display it above push pin
        $('#planeMarker').html(availableRooms[currentRoom]);
    }
}

function updateAltitude() {
    // Update the altitude
    if (gameEnd == false && altitude > 0) {
        var altitudeLoss = Math.floor((Math.random()*2000)+500);
        altitude = altitude - altitudeLoss;

        // Keep altitude at 0 and set game end to true
        if (altitude < 0) {
            altitude = 0;
            gameEnd = true;
        }
        $('#altitude-output').html(altitude+' Feet');
    } 
}

function totalCommands() {
	// Compile all arrays into one for testing
	var preTotal = $.merge(directions,visibleItems);
	total = $.merge(preTotal,inventory);
}

function negativeFeedback() {
    // Set negative feedback message for out-of-scope commands
    var itemMatch = 0;
    for (var i = 0; i < total.length; i++) {
        // Check command against all available commands (var total)
        if (commandPostVerb == total[i]) {
            itemMatch = 1;
        }
    }
    if (itemMatch == 0) {
        feedbackMessage = "That makes no sense";
        $('#feedback-output').html(feedbackMessage);
    } else if (command == "") {
        feedbackMessage = "You probably shouldn't waste time by doing nothing";
        $('#feedback-output').html(feedbackMessage);
    }
}  

function gameStatus() {
    if (gameEnd == true) {
        $('#gameEnd-output').html("Game Over!");
        $('#gameEnd-output').css('display', 'block');
    }
    if (gameWon == true) {
        $('#gameEnd-output').html("You Won!");
        $('#gameEnd-output').css('display', 'block');
    }
}


