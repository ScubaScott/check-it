// turn off / on an array of nodes

var Scene_1 = "movie";
var node = new Array();

//node.push({name: "basement", state: "OFF", value: 0});  value is dimming level

node.push({name: "basement", state: "OFF", value: 0}); 
node.push({name: "basement_lamp", state: "ON", value: 10}); 
node.push({name: "back_bar_lights", state: "OFF", value: 0}); 
node.push({name: "basement_bedroom", state: "OFF", value: 0}); 
node.push({name: "av_plug", state: "ON", value: 100}); 
node.push({name: "basement_storage", state: "OFF", value: 0}); 
node.push({name: "basement_bathroom", state: "OFF", value: 0}); 
node.push({name: "basement_vanity", state: "ON", value: 30}); 
node.push({name: "basement_shower", state: "OFF", value: 0}); 
node.push({name: "utility_room", state: "OFF", value: 0}); 



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
		logger.info("Movie Time!");
				
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
