//Keypad Buttons.
var KPbtn_1 = "kids_room_b";
//Target Node
var node_1 = "kids_room_lamp";

var definition = {
	triggers : [ {
			triggerType : "EVENT",
			events : [ {
				eventName : "node_1Change",
				id : node_1
			},{
				eventName : "KPbtn_1Change",
				id : KPbtn_1
			} ]
	}]
};
  
function run(context) {
	var eventName = context.eventName;
		 
	switch (eventName) {
	
	case "KPbtn_1Change": //the case where the user physically pressed the Keypad Button switch. we need to update the status of the node_1 switch (it wouldn't have told us it changed)
		context.sleep(1000); // let's wait for the switch to do it's thing first - insteon gets confused if you talk to it too much.
		try {
			context.queryNode(node_1);
		} catch (err) {
			//can't read the actual state of the light. This is bad. let's just bail.
			logger.error("Detected Keypad Button changed, but couldn't query node_1 switch.");
			return -1;
		}
		var KPbtn_status = context.getNodeValue(KPbtn_1, 'STATUS');
		var node_status = context.getNodeValue(node_1, 'STATUS');
		if(KPbtn_Status == node_status){
			logger.debug("Detected Keypad Button changed, node_1 status queried. They match. All good!");
			return 0; //we're happy!
		}
		//something is wrong. the Keypad Button should have updated the node_1 itself. let's fix this shit, and not just ignore it.
		logger.warn("Detected Keypad Button changed, Keypad is:"+KPbtn_status+" Node is:"+node_status);
		logger.warn("Attempting to set KeyPad to device state.");
		if(context.getNodeValue(node_1, 'STATUS') > 0){
			logger.debug("Forcing KeyPad ON");
			context.sendNodeCommand(KPbtn_1, "ON", true);
		}else{
			logger.debug("Forcing KeyPad OFF");
			context.sendNodeCommand(KPbtn_1, "OFF", true);
		}
		return 0; 
	case "node_1Change": // the case where the user toggled the node_1 in software. we have to control the Keypad Button to follow (because the node_1 switch won't forward the command, even though it controls the Keypad Button)
		//this will also execute if the physical node_1 switch was toggled. in this case the Keypad Button would automatically mirror the state, but running this code shouldn't hurt.
		var nodeStatus = context.checkNodeValue(node_1, 'STATUS', 0) ? 'OFF' : 'ON';
		var nodeLevel = context.getNodeValue(node_1, 'LEVEL');
		
		context.sendNodeCommand(KPbtn_1, nodeStatus, {level: nodeLevel});
		logger.debug("Detected node_1 changed, sent command to Keypad Button to match." + nodeStatus + ":" + nodeLevel);
		return 0;
		break;
	default:
		logger.info("Unknown event [" + eventName + "].  Cannot execute.");
		return 0;
	}
	return -1;
}