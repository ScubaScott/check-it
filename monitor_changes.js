var thermostat = "thermostat"; 

var definition = {
	triggers : [ {
		triggerType : "EVENT",
		events : [ {
			eventName : "thermostat_change",
			id : thermostat,
		}]
	}]
};

function run(context) {
	var eventName = context.eventName;


	switch (eventName) {
	case "thermostat_change":
		logger.info("status:" +context.getNodeValue("thermostat",'thermostat'));
		break;
	default:
		logger.info("Unknown event [" + eventName + "].  Cannot execute.");
		return 0;
	}
	return -1;
}