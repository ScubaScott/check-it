var load = "basement"; 
var dummy = "basement_slave"; 

var definition = {
    triggers : [ {
            triggerType : "EVENT",
            events : [ {
                eventName : "loadChange",
                id : load
            } ]
    }]
};
  
function run(context) {
    var eventName = context.eventName;
         
    switch (eventName) {
    
    case "loadChange": 
		//if load is on, turn slave on, else leave slave alone.
		if (!context.checkNodeValue(load, 'STATUS', 0)){
			context.sendNodeCommand(dummy, 'ON', true);
			logger.info("Detected load changed, sent command to dummy to match.");
		}else{
			logger.debug("switch was off, leaving slave alone");
		}
        return 0;
        break;
    default:
        logger.info("Unknown event [" + eventName + "].  Cannot execute.");
        return 0;
    }
    return -1;
}