// turn off / on an array of nodes

var Scene_1 = "home_late";
var node = new Array();

//node.push({name: "basement", state: "OFF", value: 0});  value is dimming level
node.push({name: "kids_room_lamp", state: "ON", value: 5}); 
node.push({name: "kitchen_sink1", state: "ON", value: 30}); 
node.push({name: "kitchen_sink2", state: "ON", value: 30}); 
node.push({name: "hallway", state: "ON", value: 30}); 
node.push({name: "kids_room_b", state: "ON", value: 5}); 


var definition = {
    triggers : [ {
	        triggerType : "EVENT",
	        events : [ {
	            eventName : "Scene.1",
	            alias : Scene_1,
	            property : "STATUS",
		    changedOnly : false
    		} ]
    } ]
};

function run(context) {
    var eventName = context.eventName;
	
    switch (eventName) {
    
    case "Scene.1":
		logger.info("Home Late.");
				
    	for (var i=0;i<node.length;i++) {
       		if(node[i].value){
       			context.sendNodeCommand(node[i].name, node[i].state, {level: node[i].value});
       		}else{
       			context.sendNodeCommand(node[i].name, node[i].state);
       		}
        	logger.info("node["+node[i].name+"] Level "+node[i].state+": "+node[i].value);
	}
	    break;
	    
	
    default:
        logger.info("Unknown event [" + eventName + "].  Cannot execute.");
    }
}
