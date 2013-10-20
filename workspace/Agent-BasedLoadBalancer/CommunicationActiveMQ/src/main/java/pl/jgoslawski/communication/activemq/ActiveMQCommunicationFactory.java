package pl.jgoslawski.communication.activemq;

import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.MessageProducer;
import javax.jms.Session;

import pl.jgoslawski.communication.api.Communication;
import pl.jgoslawski.communication.api.CommunicationFactory;
import pl.jgoslawski.communication.api.exceptions.CouldNotCreateCommunicationExcpetion;
import pl.jgoslawski.communication.api.exceptions.CouldNotReturnConnectionException;

public class ActiveMQCommunicationFactory implements CommunicationFactory {

	private ActiveMQConnectionsManager connectionManager;
	
	private Session session;

	
	public ActiveMQCommunicationFactory(ActiveMQConnectionsManager connectionManager)
	{
		this.connectionManager = connectionManager;
	}
	

	
	@Override
	public Communication create(String destinationName) throws CouldNotCreateCommunicationExcpetion {
		try {
			lazyCreateSesion();
			Destination destination = session.createQueue(destinationName);
			MessageProducer producer =  session.createProducer(destination);
			MessageConsumer consumer = session.createConsumer(destination);
			return new ActiveMQCommunication(producer,consumer);
		} catch (JMSException | CouldNotReturnConnectionException e) {
			throw new  CouldNotCreateCommunicationExcpetion(e.getMessage());
		}
	}

	@Override
	public Communication createSendingOnly(String destinationName) throws CouldNotCreateCommunicationExcpetion {
		try {
			lazyCreateSesion();
			Destination destination = session.createQueue(destinationName);
			MessageProducer producer =  session.createProducer(destination);
			return new ActiveMQCommunication(producer);
		} catch (JMSException | CouldNotReturnConnectionException e) {
			throw new  CouldNotCreateCommunicationExcpetion(e.getMessage());
		}
	}

	@Override
	public Communication createListenerOnly(String destinationName) throws CouldNotCreateCommunicationExcpetion{
		try {
			lazyCreateSesion();
			Destination destination = session.createQueue(destinationName);
			MessageConsumer consumer = session.createConsumer(destination);
			return new ActiveMQCommunication(consumer);
		} catch (JMSException | CouldNotReturnConnectionException e) {
			throw new  CouldNotCreateCommunicationExcpetion(e.getMessage());
		}
	}
	
	private void lazyCreateSesion() throws JMSException, CouldNotReturnConnectionException
	{
		if(session == null){
				session = connectionManager.getConnection().createSession(false, Session.AUTO_ACKNOWLEDGE);
				
		}
	}


	
}
