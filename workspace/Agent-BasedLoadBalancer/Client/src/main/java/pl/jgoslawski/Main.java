package pl.jgoslawski;


import java.util.Scanner;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import pl.jgoslawski.client.RequestSender;
import pl.jgoslawski.client.ResponseListener;
import pl.jgoslawski.communication.activemq.ActiveMQCommunicationFactory;
import pl.jgoslawski.communication.activemq.ActiveMQConnectionsManager;
import pl.jgoslawski.communication.api.Communication;
import pl.jgoslawski.communication.api.exceptions.CouldNotCleanUpCommunicationExcpetion;
import pl.jgoslawski.communication.api.exceptions.CouldNotCreateCommunicationExcpetion;
import pl.jgoslawski.communication.api.exceptions.CouldNotSetMessageListenerException;

public class Main {

	public static void main(String[] args) {		
	    Logger logger = LogManager.getLogger(Main.class);
	    logger.info("Starting client...");
	    Communication communicationSender = null;
	    Communication communicationListener = null;
	    Thread senderThread = null;
	    RequestSender sender = null;
	    ActiveMQConnectionsManager connectionsManager = new ActiveMQConnectionsManager("tcp://localhost:61616"); 
	    ActiveMQCommunicationFactory communicationFactory = new ActiveMQCommunicationFactory(connectionsManager);
	   
	    try {
			communicationSender = communicationFactory.createSendingOnly("RequestQueue");
		} catch (CouldNotCreateCommunicationExcpetion e1) {
			logger.error("Sender error:" + e1.getMessage());
			e1.printStackTrace();
		}
	    
	    try {
			communicationListener = communicationFactory.createListenerOnly("ResponseQueue");
		} catch (CouldNotCreateCommunicationExcpetion e1) {
			logger.error("Listener error:" + e1.getMessage());
			e1.printStackTrace();
		}
	    
	    if(communicationSender != null && communicationListener != null)  
	    {
	    	sender = new RequestSender(communicationSender,2000);
	    	try {
				communicationListener.setMessageListener(new ResponseListener());
			} catch (CouldNotSetMessageListenerException e) {
				logger.error("Could not set message listener: "+e.getMessage());
			}
	    	senderThread = new Thread(sender);
	    	senderThread.start();
	    }
	    
	    Scanner scanner = new Scanner(System.in);
	    logger.info("Client started successful!");
	    while(!scanner.hasNextLine()){}
	    logger.info("Shutting down client...");
	    if(sender != null){
	    	sender.stopSending();
	    	while(senderThread.isAlive()){}
	    }
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
