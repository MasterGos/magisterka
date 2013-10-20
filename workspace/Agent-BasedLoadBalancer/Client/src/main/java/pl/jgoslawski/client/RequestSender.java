package pl.jgoslawski.client;

import java.util.Random;
import java.util.concurrent.atomic.AtomicBoolean;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import pl.jgoslawski.communication.api.Communication;
import pl.jgoslawski.communication.api.exceptions.CouldNotSendMessageException;
import pl.jgoslawski.communication.messages.Request;


public class RequestSender implements Runnable {

	private int delay;
	private AtomicBoolean stop = new AtomicBoolean(false);
	final private Communication communicatio;
	final private Logger logger = LogManager.getLogger(RequestSender.class);
	
	public RequestSender(Communication communicatio,int delay)
	{
		this.communicatio = communicatio;
		this.delay = delay;
	}
	
	
	@Override
	public void run() {
		long currentId = 0;
		Random random = new Random();
		while(!stop.get())
		{
			try {
				Thread.sleep(delay);
			} catch (InterruptedException e1) {
				logger.error(e1.getMessage());
			}
			try{
				
				currentId++;
				long A = random.nextLong();
				long B = random.nextLong();
				logger.info("Sending request: ID = " +  currentId +" A = "+A + " B = "+B );
				communicatio.sendMessage(new Request(currentId,A,B));
				
			} catch (CouldNotSendMessageException e) {
				logger.error("Could not send message: "+e.getMessage());
			}
		}
	}
	
	public void stopSending(){
		stop.set(true);
	}

}
