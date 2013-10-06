package pl.jgoslawski;


import java.util.Scanner;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import pl.jgoslawski.client.RequestSender;
import pl.jgoslawski.client.ResponseListener;
import pl.jgoslawski.communication.activemq.ActiveMQCommunicationFactory;
import pl.jgoslawski.communication.activemq.ActiveMQConnectionsManager;
import pl.jgoslawski.communication.api.Communication;
import pl.jgoslawski.communication.api.exceptions.CouldNotCreateCommunicationExcpetion;
import pl.jgoslawski.communication.api.exceptions.CouldNotSetMessageListenerException;

public class Main {

	public static void main(String[] args) {		
	    Logger logger = LogManager.getLogger(Main.class);
		
	    Communication communicationSender = null;
	    Communication communicationListener = null;
	    Thread senderThread = null;
	    RequestSender sender = null;
	    ActiveMQConnectionsManager connectionsManager = new ActiveMQConnectionsManager(""); 
	    ActiveMQCommunicationFactory communicationFactoryRequest = new ActiveMQCommunicationFactory(connectionsManager, "");
	    ActiveMQCommunicationFactory communicationFactoryResponse = new ActiveMQCommunicationFactory(connectionsManager, "");
	   
	    try {
			communicationSender = communicationFactoryRequest.createSendingOnly();
		} catch (CouldNotCreateCommunicationExcpetion e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	    
	    try {
			communicationListener = communicationFactoryResponse.createListenerOnly();
		} catch (CouldNotCreateCommunicationExcpetion e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	    
	    if(communicationSender != null && communicationListener != null)  
	    {
	    	sender = new RequestSender(communicationSender,100);
	    	try {
				communicationListener.setMessageListener(new ResponseListener());
			} catch (CouldNotSetMessageListenerException e) {
				logger.error("Could not set message listener: "+e.getMessage());
			}
	    	senderThread = new Thread();
	    	senderThread.start();
	    }
	    
	    Scanner scanner = new Scanner(System.in);
	    while(!scanner.hasNext()){}
	    if(sender != null){
	    	sender.stopSending();
	    	while(senderThread.isAlive()){}
	    }
	    scanner.close();
	    connectionsManager.cleanUp();
	}


}
