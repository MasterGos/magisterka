package pl.jgoslawski;
import java.util.Scanner;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import pl.jgoslawski.communication.activemq.ActiveMQCommunicationFactory;
import pl.jgoslawski.communication.activemq.ActiveMQConnectionsManager;
import pl.jgoslawski.communication.api.Communication;
import pl.jgoslawski.communication.api.exceptions.CouldNotCleanUpCommunicationExcpetion;
import pl.jgoslawski.communication.api.exceptions.CouldNotCreateCommunicationExcpetion;
import pl.jgoslawski.communication.api.exceptions.CouldNotSetMessageListenerException;
import pl.jgoslawski.workstation.MessageProcessor;

public class Main {

	public static void main(String[] args) {		
	    Logger logger = LogManager.getLogger(Main.class);
	    logger.info("Starting workstation...");
	    ActiveMQConnectionsManager connectionsManager = new ActiveMQConnectionsManager("tcp://localhost:61616"); 
	    ActiveMQCommunicationFactory communicationFactory = new ActiveMQCommunicationFactory(connectionsManager);
	    Communication communicationSender = null;
	    Communication communicationListener = null;
	    MessageProcessor messageProcessor = null; 
	    
	    try {
			communicationSender = communicationFactory.createSendingOnly("ResponseQueue");
		} catch (CouldNotCreateCommunicationExcpetion e1) {
			logger.error("Sender error:" + e1.getMessage());
			e1.printStackTrace();
		}
	    
	    try {
			communicationListener = communicationFactory.createListenerOnly("RequestQueue");
		} catch (CouldNotCreateCommunicationExcpetion e1) {
			logger.error("Listener error:" + e1.getMessage());
			e1.printStackTrace();
		}
	    
	    if(communicationSender != null && communicationListener != null)  
	    {
	    	try {
	    		messageProcessor = new MessageProcessor(communicationSender);
				communicationListener.setMessageListener(messageProcessor);
			} catch (CouldNotSetMessageListenerException e) {
				logger.error("Could not set message listener: "+e.getMessage());
			}
	    }
	    
	    Scanner scanner = new Scanner(System.in);
	    logger.info("Workstation started successful!");
	    while(!scanner.hasNextLine()){}
	    logger.info("Shutting down workstation...");
	    scanner.close();
	    logger.info("Cleaning up....");
	    try{
	    	connectionsManager.cleanUp();
	    }catch(CouldNotCleanUpCommunicationExcpetion e)
	    {
	    	logger.error(e.getMessage());
	    }
	}


}