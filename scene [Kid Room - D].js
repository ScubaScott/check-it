// turn on / off / dim multiple physical nodes from one virtual node.
var virtual_node = "kids_room_d";
var node = new Array();

//node.push({name: "node_name", value: 70}); value is dimming level

node.push({name: "kids_room_lamp", value: 50}); 
node.push({name: "hallway", value: 50}); 
node.push({name: "bathroom", value: 50}); 

var definition = {
	triggers : [ {
			triggerType : "EVENT",
			events : [ {
				eventName : "Scene.1",
				alias : virtual_node,
				property : "STATUS",
			changedOnly : false
			},{
				eventName : "node.0",
				alias : node[0].name,
				property : "STATUS"
			//changedOnly : false
			},{
				eventName : "node.1",
				alias : node[1].name,
				property : "STATUS"
			//changedOnly : false
			} ]
	} ]
};


function run(context) {
	var eventName = context.eventName;
	
	switch (eventName) {

	case "Scene.1":
	//logger.info("here");

//	if( context.getAttribute( 'changeScene', 'GLOBAL' ) ) {
  //  		context.setAttribute('changeScene', false, 'GLOBAL', false);
 //   		return;
//	}

 	// Only process when set from button
		if (context.changeType != "PUSH") {
		//logger.info ("ERROR: Button not pushed");
			return;
		}

		for (var i=0;i<node.length;i++) {
	   		//if(!node[i].value){ node[i].value="100"; }
			context.sendNodeCommand(node[i].name, (context.checkNodeValue(virtual_node, 'STATUS', 0) ? 'OFF' : 'ON'), {level: node[i].value });
		logger.info ("set : "+node[i].name+" to "+context.getNodeValue(virtual_node, 'LEVEL'));
	}
		break;


	case "node.0":
		logger.info(node[0].name+" status changed: "+ context.value);
		
		//Set a flag so turning off the scene does not turn off the nodes in the scene.
		//context.setAttribute('changeScene', true, 'GLOBAL', false);

		if(context.value == 0){
			if(context.checkNodeValue(node[1].name, 'STATUS', 0)){ //Check if the other node is also off.... if so then turn the swith off.
				context.sendNodeCommand(virtual_node, "OFF", true);
			}
		} else {
			context.sendNodeCommand(virtual_node, "ON", {level: context.getNodeValue(node[0].name, 'LEVEL')});
		}

   	break;

	case "node.1":
		logger.info(node[1].name+" status changed: "+ context.value);
		
		//Set a flag so turning off the scene does not turn off the nodes in the scene.
		//context.setAttribute('changeScene', true, 'GLOBAL', false);

		if(context.value == 0){
			if(context.checkNodeValue(node[0].name, 'STATUS', 0)){ //Check if the other node is also off.... if so then turn the swith off.
				context.sendNodeCommand(virtual_node, "OFF", true);
			}
		} else {
			context.sendNodeCommand(virtual_node, "ON", {level: context.getNodeValue(node[1].name, 'LEVEL')});
		}

   	break;

	default:
		logger.info("Unknown event [" + eventName + "].  Cannot execute.");
	}
}