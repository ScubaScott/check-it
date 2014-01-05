
//Keypad Buttons.
var KPbtn_1 = "basement_slave";
//Target Node
var node_on = "basement";
var node_off = "basement_off";

var definition = {
    triggers : [ {
	        triggerType : "EVENT",
	        events : [ {
	            eventName : "KP.Button",
	            alias : KPbtn_1
    		}]
    } ]
};

function run(context) {
    var eventName = context.eventName;
	
	
    switch (eventName) {
    
    case "KP.Button.ON":
		logger.info(KPbtn.name + " ON pressed");
		context.sendNodeCommand(node_on, "ON", true);
	    break;
	    
    case "KP.Button.OFF":
		logger.info(KPbtn.name + " OFF pressed");
    	context.sendNodeCommand(node_off, "OFF", true);
	    break;
	
    default:
        logger.info("Unknown event [" + eventName + "].  Cannot execute.");
    }
}