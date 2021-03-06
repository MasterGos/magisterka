package pl.jgoslawski.communication.activemq;

import java.io.Serializable;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageProducer;
import javax.jms.ObjectMessage;

import org.apache.activemq.command.ActiveMQObjectMessage;

import pl.jgoslawski.communication.api.Communication;
import pl.jgoslawski.communication.api.MessageListener;
import pl.jgoslawski.communication.api.MessageListener.ErrorType;
import pl.jgoslawski.communication.api.exceptions.CouldNotSendMessageException;
import pl.jgoslawski.communication.api.exceptions.CouldNotSetMessageListenerException;

public class ActiveMQCommunication implements Communication,
		javax.jms.MessageListener {

	private MessageProducer producer;
	private MessageConsumer consumer;
	private MessageListener messageListener;

	public ActiveMQCommunication(MessageProducer producer, MessageConsumer consumer) {
		this.producer = producer;
		this.consumer = consumer;
	}
	
	public ActiveMQCommunication(MessageConsumer consumer) {
		this.consumer = consumer;
	}

	public ActiveMQCommunication(MessageProducer producer) {
		this.producer = producer;
	}
	
	@Override
	public void sendMessage(Serializable message)
			throws CouldNotSendMessageException {
		ObjectMessage objectMessage = new ActiveMQObjectMessage();
		try {
			objectMessage.setObject(message);
			producer.send(objectMessage);
		} catch (JMSException e) {
			throw new CouldNotSendMessageException(message, e.getMessage());
		}

	}

	@Override
	public void setMessageListener(MessageListener messageListener)
			throws CouldNotSetMessageListenerException {
		try {
			consumer.setMessageListener(this);
			this.messageListener = messageListener;
		} catch (Exception e) {
			throw new CouldNotSetMessageListenerException(e.getMessage());
		}

	}

	@Override
	public void onMessage(Message message) {

		if (message instanceof ObjectMessage) {
			Serializable serializableMessage;
			try {
				serializableMessage = ((ObjectMessage) message).getObject();
				messageListener.onMessage(serializableMessage);
				return;
			} catch (JMSException e) {
				messageListener.onError(ErrorType.UNKNOW_ERROR);
			}
		}
		messageListener.onError(ErrorType.UNKNOW_MESSAGE);
	}

}
