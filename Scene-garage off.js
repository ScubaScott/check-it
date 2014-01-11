// turn off / on an array of nodes

var Scene_1 = "garage_off";
var node = new Array();
node[0] = "garage_light";
node [1] = "back_garage";
node [2] = "back_garage_fan";




var definition = {
    triggers : [ {
	        triggerType : "EVENT",
	        events : [ {
	            eventName : "Scene.1.OFF",
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
	logger.info("here");

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