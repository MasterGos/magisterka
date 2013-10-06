package pl.jgoslawski.communication.api;

import pl.jgoslawski.communication.api.exceptions.CouldNotReturnConnectionException;

public interface ConnectionsManager<T> {
	
	public T getConnection() throws CouldNotReturnConnectionException;
	
	public void cleanUp();
	
}
