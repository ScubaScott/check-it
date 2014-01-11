// turn off / on an array of nodes

var Scene_1 = "all_off";
var node = new Array();
node[0] = "kitchen";
node [1] = "living_room";
node [2] = "hallway";
node [3] = "office";
node [4] = "master_bedroom";
node [5] = "kids_room_lamp";
node [6] = "bathroom";
node [7] = "kids_room_lamp";
node [8] = "front_door";
node [9] = "master_lamp";
node [10] = "back_entry";
node [11] = "back_garage";
node [12] = "basement";
node [13] = "basement_bathroom";
node [14] = "basement_lamp";
node [15] = "basement_shower";
node [16] = "garage_light";
node [17] = "patio";
node [18] = "utility_room";
node [19] = "kitchen_sink";
node [20] = "basement_storage";
node [21] = "basement_bedroom";
node [22] = "back_bar_lights";
node [23] = "office_fanlinc_21680f_light";
node [24] = "kids_fanlinc_2167cc_light";






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