//This program will listen to different keypad buttons, and 1 physical / virtual node.
//Keypad Buttons.
var KPbtn_1 = "kitchen_button_c";
var KPbtn_2 = "garage_button_c";

var node_1 = "home_late"

var definition = {
	triggers : [ {
			triggerType : "EVENT",
			events : [ {
				eventName : "KP.Button.1",
				alias : KPbtn_1,
				status : "0",
				changedOnly : false
			}, {
				eventName : "KP.Button.2",
				alias : KPbtn_2,
				status : "0",
				changedOnly : false
			}]
	} ]
};


function run(context) {
    var eventName = context.eventName;


    // Only process when set from button
	if (context.changeType != "PUSH") {
		return;
	}
	
	//context.setAttribute('currentState',state, 'PROGRAM', false);
	
	
    switch (eventName) {
	
	case "KP.Button.1":
		logger.info("Kitchen C - Home Late");
		context.sendNodeCommand(node_1, "ON", true);
		break;

	case "KP.Button.2":
		logger.info("Garage C - Home Late");
		context.sendNodeCommand(node_1, "ON", true);
	    break;

	default:
		logger.info("Unknown event [" + eventName + "].  Cannot execute.");
	}
}