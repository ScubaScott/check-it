//This program will listen to different keypad buttons, and 1 physical / virtual node.
//Keypad Buttons.
var KPbtn_1 = "kitchen_button_c";
var KPbtn_2 = "garage_button_c";

var node_1 = "home_late"

var definition = {
	triggers : [ {
			triggerType : "EVENT",
			events : [ {
				eventName : "KP.Button.1",
				alias : KPbtn_1,// turn off / on an array of nodes

var Scene_1 = "home_late";
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
				status : "0",
				changedOnly : false
			}, {
				eventName : "KP.Button.2",
				alias : KPbtn_2,
				status : "0",
				changedOnly : false
			}]
	} ]
};


function run(context) {
	var eventName = context.eventName;
	//var state = (context.value == 0) ? "OFF" : "ON";
	//var currentState = context.getAttribute( 'currentState', 'PROGRAM' )
	//logger.debug(node_1+" current State: "+state);

	//if(state == currentState) {
	//	return; 
	//}

	// Only process when set from button
	if (context.changeType != "PUSH") {
		return;
	}
	
	//context.setAttribute('currentState',state, 'PROGRAM', false);
	
	
	switch (eventName) {
	
	case "KP.Button.1":
		logger.info("Kitchen C - Home Late");
		context.sendNodeCommand(node_1, "ON", true);
		break;

	case "KP.Button.2":
		logger.info("Garage C - Home Late");
		context.sendNodeCommand(node_1, "ON", true);
		break;

	default:
		logger.info("Unknown event [" + eventName + "].  Cannot execute.");
	}
}