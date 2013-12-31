var definition = {

	triggers : [
	
		{
			triggerType : "SCHEDULED",
			schedules : [
							]
		}
	]
};

function run(context){
	var eventName = context.eventName;
	
	switch (eventName) {
		
		
		default:
			logger.info("Unknown event [" + eventName + "].  Cannot execute.");
	}

}