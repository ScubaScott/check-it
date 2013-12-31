/*TEMPLATE PROGRAM*/

var definition = {
	triggers : [ 
		{
			triggerType : "EVENT",
			events : [ {
				eventName : "myEvent",
				alias : "nodeAlias",
				property : "STATUS",
				value : 0,
				changedOnly : true
			} ]
		},
		
		{
			triggerType : "SCHEDULED",
			schedules : [ {
				eventName : "mySchedule",
				schedule : "0 50 15 * * *"
			} ]
		} 
	]
};
 
function run(context) {
	var eventName = context.eventName;
	
	switch (eventName) {
		case "myEvent":
		//TODO: insert program code here
	    
		break;
		case "mySchedule":
		//TODO: insert program code here
		
		break;
		default:
			logger.info("Unknown event [" + eventName + "].  Cannot execute.");
	}
}