//This program will listen to1 different keypad buttons, and 1 physical / virtual node.
//Keypad Buttons.
var KPbtn_1 = "master_button_c";
var node_1 = "all_on";

var definition = {
    triggers : [ {
	        triggerType : "EVENT",
	        events : [ {
	            eventName : "KP.Button.1",
	            alias : KPbtn_1,
	            status : "0",
		    changedOnly : false
    		} ]
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
	
	//context.setAttribute('currentState',state, 'PROGRAM', false);
	
	// Only process when set from button
    	if (context.changeType != "PUSH") {
        	return;
    	}
	
    switch (eventName) {
	
	case "KP.Button.1":
		logger.info("MASTER BEDROOM - ALL ON");
		if(context.value == 0){
			//Keypad Button 1 - OFF Turn off other switches and devices
			context.sendNodeCommand(node_1, "OFF", true);
		} else {
			//Keypad Button 1 - ON Turn on other switches and devices
			context.sendNodeCommand(node_1, "ON", true);
		}
	    break;





    default:
        logger.info("Unknown event [" + eventName + "].  Cannot execute.");
    }
}