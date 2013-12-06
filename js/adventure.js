/*-----------------------
Game Variables
-----------------------*/
// Set a bunch of initial variables
var message;
var command;
var messageItem;
var commandPostVerb;
var commandVerb;
var feedbackMessage;
var altitude = 30000;
var currentRoom = 2;

// Boolean tests
var gameEnd = false;
var gameWon = false;
var gameStart = false;
var cockpitDoor = false;
var parachute = false;

// Set arrays
var availableRooms = new Array("Cockpit", "Galley", "Cabin", "Bathroom", "Cargo Hold");
var inventory = new Array();
var visibleItems = new Array();
var directions = new Array();
var preTotal = new Array();
var total = new Array();

// Set Starting Items
inventory[0] = "wrist watch";

// Set messages
messageOpening = "You wake up disoriented, head pounding, wearing nothing but tattered jeans and a shirt that isn’t even yours. The taste of whiskey and regret thick on your tongue. You pat yourself down and realize all you have on you is a wrist watch and a load of regret. Suddenly you realize you are on an out of control plane plummeting to your death. What do you do?"
messageCabin = "You are standing in the cabin, empty except for some scattered debris. All of the emergency oxygen masks have been deployed except for yours. Typical."
messageBathroom = "You are standing in the bathroom, not surprisingly, there was no line.  Huh. There is a small hatch on the floor. How could you never have noticed that before. You ponder its purpose, poop hatch or something cooler?! Only one way to find out…"
messageCargo = "Whoa. You climb down the floor hatch into a narrow access tunnel leading to what appears to be the Cargo Hold. Sadly, no cargo to explore. Just empty and cold. So very cold. You wonder if this is because there is less insulation down here or something. You really should have paid more attention when watching Executive Decision. "
messageGalley = "You are standing in the galley. Visions of free mini booze and snacks dance through your head. Instead there is just an empty wet bar and a door."
messageCockpit = "You are standing in the Cockpit. The instrument console appears to be destroyed, and the pilots are dead. Well that sucks."

messageUseWatch = "You check the time, which doesn’t seem to accomplish much except for wasting it."
messageUseSkymall = "You leaf through the pages of the skymall catalogue and laugh at the ridiculousness of some of the items. Who would buy such cra…OOHH! A pierogi shaped Christmas ornament. You make a mental note to get that for your mother-in-law. Sweet. One gift down. You will be the star of Christmas."
messageUseSkymallBathroom = "You don’t know if it a pavlovian response,  but having a magazine coupled with proximity to a toilet just seems to get things moving. Feeling sassy, you decide to poop with the door open. Take that FAA!"
messageUseNailClippers = "As you grasp the cool metal in your hands, you cannot help wonder if this piece of contraband was the cause of your predicament. You hang onto them in case you need a shiv, you know, for science."
messageUseLoafer = "You throw the loafer down the aisle and laugh menacingly, and in your best Austin Powers impression say “who throws a shoe, honestly”. Unfortunately there is no one around to hear you and you start sobbing. You slowly get your shit together and decide to keep the shoe as a souvenir and contemplate a new career as a prop comic."
messageUseToiletPaperBathroom = "Ah, the good old reliable single ply 'I hate my ass' brand toilet paper. You make a mental note to wash your hands twice."
messageUseToiletPaper = "You start throwing the roll around watching it cover the area with TP streamers. You decide to gather up the toilet paper as best you can and remind yourself that hangover shits come in waves, so you shouldn’t be wasting such a precious commodity."
messageUseKeysRight = "You slide one of the keys into the lock of the door. It must be your lucky day because it opened the door on your first try! Yep. Lucky day indeed!"
messageUseKeysWrong = "Jingle jingle jingle... if video games taught you anything, it is keys can always come in handy"
messageUseCargoNet = "You try to figure out what you would do with this thing, and only succeed in getting tangled. Great. Maybe you should stop horsing around."
messageUseMountainDew = "You open the can of mountain dew. As you drink it, you hope it gives you the power to take things to the extreme. It doesn’t. You forgot about your raging diabetes and you die."
messageUseFireExtinguisher = "You have always wanted to use a fire extinguisher, now is your chance! You pull the pin and engage the trigger. The fire extinguisher sputters and sprays out a few drops of something and then does nothing. That was anticlimactic. Good thing you aren’t in an emergency situation. Oh wait."
messageUseFlareWrong = "Whoooosh! What seemed like a good idea has gone horribly wrong. There is now a small fire in the " + availableRooms[currentRoom] + ". Maybe you should use it in a less fortified and dangerous area."
messageUseFlareRightNoParachute = "You point the flare gun towards the side of the plane and successfully blow a hole in hull. You feel yourself getting sucked out. You start to panic and hope that maybe you will fall and land someplace soft, no such luck. You plummet to your death."
messageUseFlareRightParachute = "You point the flare gun towards the side of the plane and successfully blow a hole in hull. You feel yourself getting sucked out. You start to panic, but you remember you put on the parachute! Sweet freedom here you come!"
messageUseParachute = "Carefully, you strap the parachute to your back. You look like an idiot, but you figure it is better to be safe than sorry. Hopefully you cinched all the buckles and attached all the straps correctly… "

/*-----------------------
Onload functions
-----------------------*/
$( document ).ready(function() {
        planeMarker();        
        setRooms();
        totalCommands();
        // Set starting message
        message = messageOpening;
        display();
});


/*-----------------------
Submit functions
-----------------------*/
$( "#commandForm" ).submit(function(event) {
    // Run functions
    if (gameEnd == false) {
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
    }
    gameStatus();
    event.preventDefault();
});

$( "#reload" ).click(function() {
    location.reload();
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

    if (commandVerb[0] == "move" || commandVerb[0] == "go") {
        for (var i = 0; i < directions.length; i++) {
            // Make sure we have a match to an available exit
            if (commandPostVerb == directions[i]) {

                // Clear any negative feedback messages
                feedbackMessage = "";
                message = "";
                $('#feedback-output').html(feedbackMessage);
                $('#messageItem-output').html(message);

                if (directions[i] == 'forward' && currentRoom != 0) {

                	// Check for door lock
                	if (cockpitDoor == false && currentRoom == 1) {
                		message = "You try to move forward, but the door is locked";
                		$('#messageItem-output').html(message);
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

// Only show items if they arent already in inventory
// For use inside 'setRooms'
function checkVisibleItems() {
    for (i = 0; i < visibleItems.length; i++) {
        for (j = 0; j < inventory.length; j++) {

            // Test visible items agains inventory
            if (visibleItems[i] == inventory[j]) {
                // You already have the item, clear it from the visible item array
                visibleItems[i] = '';
                // Output visible items again, post-filtering
                $('#item-output').html(visibleItems);
            }
        }
    }
}

// Set room text, exits, and visible items
function setRooms() {
    if (currentRoom == 0) {
            
        // Set story text for cockpit
        message = messageCockpit;
        $('#message-output').html(message);

        // available exits
        directions = ['backward'];
		$('#directions-output').html(directions.join(', '));

		// Set and Display initial visible items
        visibleItems = ['container of noodles', 'flare gun'];
        $('#item-output').html(visibleItems.join(', '));

        // Only show items if they arent already in inventory
        checkVisibleItems()

	} else if (currentRoom == 1) {
        
		// Set story text for galley
        message = messageGalley;
        $('#message-output').html(message);

        // available exits
        directions = ['forward', 'backward'];

        $('#directions-output').html(directions.join(', '));

        // Set and Display initial visible items
        visibleItems = ['can of mountain dew', 'fire extinguisher', 'parachute'];
        $('#item-output').html(visibleItems.join(', '));

        // Only show items if they arent already in inventory
        checkVisibleItems()

	} else if (currentRoom == 2) {
		// Set story text for cabin
        message = messageCabin;
        $('#message-output').html(message);

        // available exits
        directions = ['forward', 'backward'];
		$('#directions-output').html(directions.join(', '));

        // Set and Display initial visible items
        visibleItems = ['skymall catalogue', 'loafer'];
        $('#item-output').html(visibleItems.join(', '));

        // Only show items if they arent already in inventory
        checkVisibleItems()

	} else if (currentRoom == 3) {

        // Set story text for bathroom
        message = messageBathroom;

        $('#message-output').html(message);
        
        directions = ['forward', 'down'];
        $('#directions-output').html(directions.join(', '));

        // Set and Display initial visible items
        visibleItems = ['toilet paper', 'nail clippers'];
        $('#item-output').html(visibleItems.join(', '));

        // Only show items if they arent already in inventory
        checkVisibleItems()

	} else if (currentRoom == 4) {
		
		// Set story text for cargo hold
        message = messageCargo;
        $('#message-output').html(message);

        // available exits
        directions = ['up'];
		$('#directions-output').html(directions.join(', '));

        // Set and Display initial visible items
        visibleItems = ['cargo net', 'keys'];
        $('#item-output').html(visibleItems.join(', '));

        // Only show items if they arent already in inventory
        checkVisibleItems()
    }
}

function getItem() {
    // Only do this stuff if command is preceded by GET
    if (commandVerb[0] == "get" || commandVerb[0] == "take") {
        // Check the visible items array by looping through it
        for (var i = 0; i < visibleItems.length; i++) {
            // Make sure our command matches a visible item
            if (commandPostVerb == visibleItems[i]) {
                
                // Add visible item to inventory
                inventory.push(visibleItems[i]);

                // Set a message to assist with narrative
                message2 = "You take the " + visibleItems[i] +". ";
                $('#messageItem-output').html(message2);

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
				message2 = "You use the " + inventory[i] +". ";

				if (commandPostVerb == "keys") {
					// Append extra text to message
                    if (currentRoom == 1) {
    					message2 = message2 + messageUseKeysRight;
    					cockpitDoor = true;
                    } else {
                        message2 = message2 + messageUseKeysWrong;
                    }
				} else if (commandPostVerb == "parachute") {
                    message2 = message2 + messageUseParachute;
                    parachute = true;
                } else if (commandPostVerb == "can of mountain dew") {
                    message2 = message2 + messageUseMountainDew;
                    gameEnd = true;
                } else if (commandPostVerb == "fire extinguisher") {
                    message2 = message2 + messageUseFireExtinguisher;
                } else if (commandPostVerb == "cargo net") {
                    message2 = message2 + messageUseCargoNet;
                } else if (commandPostVerb == "fire extinguisher") {
                    message2 = message2 + messageUseFireExtinguisher;
                } else if (commandPostVerb == "wrist watch") {
                    message2 = message2 + messageUseWatch;
                } else if (commandPostVerb == "skymall catalogue") {
                    if (currentRoom == 3) {
                        message2 = message2 + messageUseSkymallBathroom;
                    } else {
                        message2 = message2 + messageUseSkymall;
                    }
                } else if (commandPostVerb == "nail clippers") {
                    message2 = message2 + messageUseNailClippers;
                } else if (commandPostVerb == "loafer") {
                    message2 = message2 + messageUseLoafer;
                } else if (commandPostVerb == "toilet paper") {
                    if (currentRoom == 3) {
                        message2 = message2 + messageUseToiletPaperBathroom;
                    } else {
                        message2 = message2 + messageUseToiletPaper;
                    }
                } else if (commandPostVerb == "flare gun") {
                    if (currentRoom == 4) {
                        //you blow a hole in the back of the plane and get sucked out
                        if (parachute == true) {
                            message2 = message2 + messageUseFlareRightParachute;
                            gameWon = true;
                        } else {
                            message2 = message2 + messageUseFlareRightNoParachute;
                        }
                    } else {
                        message2 = message2 + messageUseFlareWrong;
                    }
                } else {
					message2 = message2 + "You succeed in wasting some time"
				}
				// Output the final message to the HTML
                $('#messageItem-output').html(message2);
			}
		}
	}
}


/*-----------------------
Set Plane Map
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
        var altitudeLoss = Math.floor((Math.random()*1500)+400);
        altitude = altitude - altitudeLoss;

        if (altitude < 15000) {
            $('#altitude-output').css('color', 'orange');
        } 
        if (altitude < 5000) {
            $('#altitude-output').css('color', 'red');
        }

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
	preTotal = $.merge(directions,visibleItems);
	total = $.merge(preTotal,inventory);
}

function negativeFeedback() {
    // Set negative feedback message for out-of-scope commands
    var itemMatch = 0;

    // Make sure the command matches directions and visible objects
    for (var i = 0; i < preTotal.length; i++) {
        if (commandPostVerb == preTotal[i] && (commandVerb == "get" || commandVerb == "take" || commandVerb == "move" || commandVerb == "go")) {
            itemMatch = 2;
        }
    }

    // Give error if item is visible, but trying to be used as if in inventory
    for (var i = 0; i < preTotal.length; i++) {
        if (commandPostVerb == preTotal[i] && commandVerb == "use") {
            itemMatch = 3;
        }
    }

    // Make sure the command matches something in the inventory and verb is USE
    for (var i = 0; i < inventory.length; i++) {
        if (commandPostVerb == inventory[i] && commandVerb == "use") {
            itemMatch = 1;
        }
    }

    if (itemMatch == 0) {
        feedbackMessage = "That makes no sense";
        $('#feedback-output').html(feedbackMessage);
    } else if (itemMatch == 1 || itemMatch == 2) {
        feedbackMessage = "";
        $('#feedback-output').html(feedbackMessage);
    } else if (itemMatch == 3) {
        feedbackMessage = "You can't use an item you don't have";
        $('#feedback-output').html(feedbackMessage);
    } else if (command == "") {
        feedbackMessage = "You probably shouldn't waste time by doing nothing";
        $('#feedback-output').html(feedbackMessage);
    }
}  

function gameStatus() {
    if (gameEnd == true) {
        $('#gameStatus-output').html("You Died!");
        $('#gameStatus').css('display', 'block');
    }
    if (gameWon == true) {
        $('#gameStatus-output').html("You Escaped!");
        $('#gameStatus').css('display', 'block');
    }
}


