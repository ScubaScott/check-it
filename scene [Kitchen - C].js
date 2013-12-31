// turn off / on an array of nodes

var Scene_1 = "kitchen_button_c";
var node = new Array();

//node.push({name: "node_name", value: 70}); value is dimming level

node.push({name: "kitchen_sink1", value: 30}); 
node.push({name: "kitchen_sink2", value: 30}); 
node.push({name: "hallway", value: 30}); 
node.push({name: "kids_room_lamp", value: 5}); 

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
	//logger.info("here");

		for (var i=0;i<node.length;i++) {
	   		if(!node[i].value){ node[i].value="100"; }
		//logger.info("node["+i+"] Level : "+node[i].value); 
			context.sendNodeCommand(node[i].name, "ON", {level: node[i].value});
	}
		break;
		
	
	default:
		logger.info("Unknown event [" + eventName + "].  Cannot execute.");
	}
}