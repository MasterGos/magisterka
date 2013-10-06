package pl.jgoslawski.communication.api;

import java.io.Serializable;

import pl.jgoslawski.communication.api.exceptions.CouldNotSendMessageException;
import pl.jgoslawski.communication.api.exceptions.CouldNotSetMessageListenerException;

public interface Communication {

	public void sendMessage(Serializable message) throws CouldNotSendMessageException;
	
	public void setMessageListener(MessageListener messageListener) throws CouldNotSetMessageListenerException;
}
