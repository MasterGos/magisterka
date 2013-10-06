package pl.jgoslawski.communication.api;

import pl.jgoslawski.communication.api.exceptions.CouldNotCreateCommunicationExcpetion;

public interface CommunicationFactory {

	public Communication create() throws CouldNotCreateCommunicationExcpetion;
	 
	public Communication createSendingOnly() throws CouldNotCreateCommunicationExcpetion;
	
	public Communication createListenerOnly() throws CouldNotCreateCommunicationExcpetion;
	
	
}
