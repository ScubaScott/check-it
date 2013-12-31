//This program will listen to1 different keypad buttons, and 1 physical / virtual node.
//Keypad Buttons.
var KPbtn_1 = "master_button_b";
var node_1 = "master_lamp";

var definition = {
    triggers : [ {
            triggerType : "EVENT",
            events : [ {
                eventName : "node_1Change",
                id : node_1
            },{
                eventName : "KPbtn_1Change",
                id : KPbtn_1
            } ]
    }]
};
  
function run(context) {
    var eventName = context.eventName;
         
    switch (eventName) {
    
    case "KPbtn_1Change": //the case where the user physically pressed the Keypad Button switch. we need to update the status of the node_1 switch (it wouldn't have told us it changed)
        context.sleep(1000); // let's wait for the switch to do it's thing first - insteon gets confused if you talk to it too much.
        try {
            context.queryNode(node_1);
        } catch (err) {
            //can't read the actual state of the light. This is bad. let's just bail.
            logger.error("Detected Keypad Button changed, but couldn't query node_1 switch.");
            return -1;
        }
        if(context.getNodeValue(node_1, 'STATUS') == context.getNodeValue(KPbtn_1, 'STATUS')){
            logger.debug("Detected Keypad Button changed, node_1 status queried. They match. All good!");
            return 0; //we're happy!
        }
        //something is wrong. the Keypad Button should have updated the node_1 itself. We can't be sure what's going on though, so we'll just leave well enough alone.
        logger.warn("Detected Keypad Button changed, queried node_1 switch but state doesn't match.");
        return 0; 
    case "node_1Change": // the case where the user toggled the node_1 in software. we have to control the Keypad Button to follow (because the node_1 switch won't forward the command, even though it controls the Keypad Button)
        //this will also execute if the physical node_1 switch was toggled. in this case the Keypad Button would automatically mirror the state, but running this code shouldn't hurt.
        context.sendNodeCommand(KPbtn_1, (context.checkNodeValue(node_1, 'STATUS', 0) ? 'OFF' : 'ON'), {level: context.getNodeValue(node_1, 'LEVEL')});
        logger.debug("Detected node_1 changed, sent command to Keypad Button to match.");
        return 0;
        break;
    default:
        logger.info("Unknown event [" + eventName + "].  Cannot execute.");
        return 0;
    }
    return -1;
}