// turn off / on an array of nodes

var Scene_1 = "all_on";
var node = new Array();
node[0] = "bathroom";

node [1] = "back_entry";
node [2] = "front_door";
node [3] = "garage_light";
node [4] = "hallway";
node [5] = "kitchen";
node [6] = "living_room";
node [7] = "office";
node [8] = "patio";
node [9] = "kitchen_sink";

var definition = {
    triggers : [ {
	        triggerType : "EVENT",
	        events : [ {
	            eventName : "Scene.1.ON",
	            alias : Scene_1,
	            property : "STATUS",
		    changedOnly : false
    		} ]
    } ]
};


function run(context) {
    var eventName = context.eventName;
	
    switch (eventName) {
    
    case "Scene.1.ON":
	logger.info("Triggering ALL ON");

    	for (var i=0;i<node.length;i++) {
			context.sendNodeCommand(node[i], "ON", true);
		}
	    break;
	    
    case "Scene.1.OFF":
	logger.info("Triggering All Off");
    	for (var i=0;i<node.length;i++) {
			context.sendNodeCommand(node[i], "OFF", true);
		}
	    break;
	
    default:
        logger.info("Unknown event [" + eventName + "].  Cannot execute.");
    }
}