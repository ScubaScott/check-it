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
    
    case "loadChange": // the case where the user toggled the load in software. we have to control the dummy to follow (because the load switch won't forward the command, even though it controls the dummy)
        //this will also execute if the physical load switch was toggled. in this case the dummy would automatically mirror the state, but running this code shouldn't hurt.
        context.sendNodeCommand(dummy, 'ON', true);
        logger.debug("Detected load changed, sent command to dummy to match.");
        return 0;
        break;
    default:
        logger.info("Unknown event [" + eventName + "].  Cannot execute.");
        return 0;
    }
    return -1;
}