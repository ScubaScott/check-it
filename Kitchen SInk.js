//This program will listen to1 different keypad buttons, and 1 physical / virtual node.
//Keypad Buttons.
var KPbtn_1 = "kitchen_sink";
// Fire on a Scene ON / OFF

var scene1 = "kitchen_sink";
var node = new Array();

//node.push({name: "basement_back", value: 60}); 
node.push({name: "kitchen_sink1"}); 
node.push({name: "kitchen_sink2"}); 


var definition = {
    triggers : [ {
	        triggerType : "EVENT",
	        events : [ {
	            eventName : "Scene.1",
	            alias : scene1,
	            property : "STATUS"
    		} ]
    } ]
};

function run(context) {
	var eventName = context.eventName;
	var state = (context.value == 0) ? "OFF" : "ON";
	var currentState = context.getAttribute( 'currentState', 'PROGRAM' )
	//logger.debug(node_1+" current State: "+state);

	if(state == currentState) {
		return; 
	}
	
	context.setAttribute('currentState',state, 'PROGRAM', false);
	
	
    switch (eventName) {
    
    case "Scene.1":
    	if( context.getAttribute( 'sceneKill', 'PROGRAM' ) ) {
    		context.setAttribute('sceneKill', false, 'PROGRAM', false);
    		return;
  		}
		logger.info(scene1+" triggered: "+state);
		for (var i=0;i<node.length;i++) {
			if(!node[i].value){ node[i].value="100"; }
			//logger.info("node["+i+"] Level : "+node[i].value); 
        		context.sendNodeCommand(node[i].name, (context.checkNodeValue(scene1, 'STATUS', 0) ? 'OFF' : 'ON'), {level: node[i].value });
		}
   	break;
	
    default:
        logger.info("Unknown event [" + eventName + "].  Cannot execute.");
    }
}