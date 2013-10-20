package pl.jgoslawski.communication.api;

import java.io.Serializable;

public interface MessageListener {
	
	public enum ErrorType
	{
		UNKNOW_ERROR,
		UNKNOW_MESSAGE
	}
	
	public void onMessage(Serializable message);
	
	public void onError(ErrorType error);

}
