// turn off / on an array of nodes

var Scene_1 = "basement_off";
var node = new Array();

node [0] = "basement";
node [1] = "basement_bathroom";
node [2] = "basement_lamp";
node [3] = "basement_shower";
node [4] = "utility_room";
node [5] = "basement_storage"
node [6] = "basement_bedroom"
node [7] = "back_bar_lights";






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