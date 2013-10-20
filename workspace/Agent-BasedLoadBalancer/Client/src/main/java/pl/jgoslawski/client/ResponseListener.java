package pl.jgoslawski.client;

import java.io.Serializable;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import pl.jgoslawski.communication.api.MessageListener;

public class ResponseListener implements MessageListener {

	final Logger logger = LogManager.getLogger(ResponseListener.class);
	
	
	
	@Override
	public void onError(ErrorType arg0) {

		logger.error(arg0.name());
	}

	@Override
	public void onMessage(Serializable arg0) {
		
		
	}

}
