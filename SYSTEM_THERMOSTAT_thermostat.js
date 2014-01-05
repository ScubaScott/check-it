var definition = {

	triggers : [
	
		{
			triggerType : "SCHEDULED",
			schedules : [
									{
						eventName : "weekday morning1",
						schedule : "0 0 6 * * 1,2,3,4,5",
						timeZone : "US/Central"
					}
			]
		}
	]
};

function run(context){
	var eventName = context.eventName;
	
	switch (eventName) {
		
		case "weekday morning1":
		
			context.sendNodeCommand("thermostat", 'Thermostat', {
				async: false,
				mode:'HEAT',
				fanmode:'AUTO',
				heatpoint:18.5,
				coolpoint:26.5
			});

		break;
		
		default:
			logger.info("Unknown event [" + eventName + "].  Cannot execute.");
	}

}