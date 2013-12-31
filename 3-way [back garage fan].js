var load = "back_garage_fan"; 
var dummy = "garage_button_a"; 
 
var definition = {
    triggers : [ {
            triggerType : "EVENT",
            events : [ {
                eventName : "loadChange",
                id : load
            },{
                eventName : "dummyChange",
                id : dummy
            } ]
    }]
};
  
function run(context) {
    var eventName = context.eventName;
         
    switch (eventName) {
    
    case "dummyChange": //the case where the user physically pressed the dummy switch. we need to update the status of the load switch (it wouldn't have told us it changed)
        context.sleep(1000); // let's wait for the switch to do it's thing first - insteon gets confused if you talk to it too much.
        try {
            context.queryNode(load);
        } catch (err) {
            //can't read the actual state of the light. This is bad. let's just bail.
            logger.error("Detected dummy changed, but couldn't query load switch.");
            return -1;
        }
        if(context.getNodeValue(load, 'STATUS') == context.getNodeValue(dummy, 'STATUS')){
            logger.debug("Detected dummy changed, load status queried. They match. All good!");
            return 0; //we're happy!
        }
        //something is wrong. the dummy should have updated the load itself. We can't be sure what's going on though, so we'll just leave well enough alone.
        logger.warn("Detected dummy changed, queried load switch but state doesn't match.");
        return 0; 
    case "loadChange": // the case where the user toggled the load in software. we have to control the dummy to follow (because the load switch won't forward the command, even though it controls the dummy)
        //this will also execute if the physical load switch was toggled. in this case the dummy would automatically mirror the state, but running this code shouldn't hurt.
        context.sendNodeCommand(dummy, (context.checkNodeValue(load, 'STATUS', 0) ? 'OFF' : 'ON'), {level: context.getNodeValue(load, 'LEVEL')});
        logger.debug("Detected load changed, sent command to dummy to match.");
        return 0;
        break;
    default:
        logger.info("Unknown event [" + eventName + "].  Cannot execute.");
        return 0;
    }
    return -1;
}