//This program will listen to1 different keypad buttons, and 1 physical / virtual node.
//Keypad Buttons.
var KPbtn_1 = "basement_button_d";

var node_1 = "basement_off";

var definition = {
    triggers : [ {
	        triggerType : "EVENT",
	        events : [ {
	            eventName : "KP.Button.1",
	            alias : KPbtn_1,
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
		logger.info("Basement - ALL OFF");
		context.sendNodeCommand(node_1, "ON", true);
	    break;


    default:
        logger.info("Unknown event [" + eventName + "].  Cannot execute.");
    }
}