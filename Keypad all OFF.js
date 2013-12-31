//This program will listen to1 different keypad buttons, and 1 physical / virtual node.
//Keypad Buttons.
var KPbtn_1 = "master_button_d";
var KPbtn_2 = "kitchen_button_d";
var KPbtn_3 = "office_kpl_d";
var KPbtn_4 = "garage_button_d";


var node_1 = "all_off";

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
			}, {
				eventName : "KP.Button.3",
				alias : KPbtn_3,
				status : "0",
				changedOnly : false
			}, {
				eventName : "KP.Button.4",
				alias : KPbtn_4,
				status : "0",
				changedOnly : false
			}]
	} ]
};


function run(context) {
	var eventName = context.eventName;
	//var state = (context.value == 0) ? "OFF" : "ON";
	//var currentState = context.getAttribute( 'currentState', 'PROGRAM' )
	//logger.debug(node_1+" current State: "+state);

	//if(state == currentState) {
	//	return; 
	//}

	// Only process when set from button
	if (context.changeType != "PUSH") {
		return;
	}
	
	//context.setAttribute('currentState',state, 'PROGRAM', false);
	
	
	switch (eventName) {
	
	case "KP.Button.1":
		logger.info("MASTER BEDROOM - ALL OFF");
		context.sendNodeCommand(node_1, "ON", true);
		break;

	case "KP.Button.2":
		logger.info("KITCHEN- ALL OFF");
		context.sendNodeCommand(node_1, "ON", true);
		break;

	case "KP.Button.3":
		logger.info("OFFICE- ALL OFF");
		context.sendNodeCommand(node_1, "ON", true);
		break;

	case "KP.Button.4":
		logger.info("BACK GARAGE- ALL OFF");
		context.sendNodeCommand(node_1, "ON", true);
		break;
	default:
		logger.info("Unknown event [" + eventName + "].  Cannot execute.");
	}
}