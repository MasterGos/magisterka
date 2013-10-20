package pl.jgoslawski.workstation;

import java.io.Serializable;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import pl.jgoslawski.communication.api.Communication;
import pl.jgoslawski.communication.api.MessageListener;
import pl.jgoslawski.communication.api.exceptions.CouldNotSendMessageException;
import pl.jgoslawski.communication.messages.Request;
import pl.jgoslawski.communication.messages.Response;

public class MessageProcessor implements MessageListener {

	final Logger logger = LogManager.getLogger(MessageProcessor.class);
	
	private Communication communication;
	
	public MessageProcessor(Communication communication) {
		this.communication = communication;
	}
	
	@Override
	public void onError(ErrorType arg0) {
		logger.error(arg0.name());
	}

	@Override
	public void onMessage(Serializable arg0) 
	{
		
		Request request = (Request)arg0;
		long result = request.getA() + request.getB();
		
		logger.info("Sending response: " + result + " for message ID = "+ request.getID());
		Response response = new Response(request.getID(),result);
		
		try {
			communication.sendMessage(response);
		} catch (CouldNotSendMessageException e) {
			logger.error("Could not send response message!");
		}
	}

}
