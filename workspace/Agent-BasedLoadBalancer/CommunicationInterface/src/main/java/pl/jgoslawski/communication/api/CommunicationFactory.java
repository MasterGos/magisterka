package pl.jgoslawski.communication.api;

import pl.jgoslawski.communication.api.exceptions.CouldNotCreateCommunicationExcpetion;

public interface CommunicationFactory {

	public Communication create(String dectination) throws CouldNotCreateCommunicationExcpetion;
	 
	public Communication createSendingOnly(String dectination) throws CouldNotCreateCommunicationExcpetion;
	
	public Communication createListenerOnly(String dectination) throws CouldNotCreateCommunicationExcpetion;
	
	
}
