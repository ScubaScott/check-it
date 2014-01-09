// turn off / on an array of nodes

var Scene_1 = "basement_off";
var node = new Array();

node [0] = "basement";
node [1] = "basement_lamp";
node [2] = "back_bar_lights";
node [3] = "basement_bedroom"
node [4] = "av_plug";
node [5] = "basement_storage"
node [6] = "basement_bathroom";
node [7] = "basement_vanity";
node [8] = "basement_shower";
node [9] = "utility_room";


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
    
    case "Scene.1.OFF":
	logger.info("Triggering All Off");
    	for (var i=0;i<node.length;i++) {
			context.sendNodeCommand(node[i], "OFF", true);
			logger.info("All Off-"+node[i]);
		}
	    break;
	
    default:
        logger.info("Unknown event [" + eventName + "].  Cannot execute.");
    }
}
