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
    
    case "KP.Button":
		if(context.checkNodeValue(KPbtn_1, 'STATUS', 0)){
			logger.info(KPbtn_1 + " OFF pressed");
			context.sendNodeCommand(node_off, "OFF");
		}else{
			logger.info(KPbtn_1 + " ON pressed");
			context.sendNodeCommand(node_on, "ON");
		}
		break;
    default:
        logger.info("Unknown event [" + eventName + "].  Cannot execute.");
    }
}
