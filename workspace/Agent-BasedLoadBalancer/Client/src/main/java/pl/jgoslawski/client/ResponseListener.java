package pl.jgoslawski.client;

import java.io.Serializable;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import pl.jgoslawski.communication.api.MessageListener;
import pl.jgoslawski.communication.messages.Response;

public class ResponseListener implements MessageListener {

	final Logger logger = LogManager.getLogger(ResponseListener.class);
	
	
	
	@Override
	public void onError(ErrorType arg0) {

		logger.error(arg0.name());
	}

	@Override
	public void onMessage(Serializable arg0) {
		Response response = (Response)arg0;
		logger.info("Response message: ID =  "+ response.getID() + " Result = " + response.getResult());
	}

}
