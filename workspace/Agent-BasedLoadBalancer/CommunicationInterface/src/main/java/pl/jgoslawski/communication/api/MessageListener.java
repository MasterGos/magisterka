package pl.jgoslawski.communication.api;

import java.io.Serializable;

public interface MessageListener {
	
	public enum ErrorType
	{
		UNKNOW_ERROR,
		UNKOW_MESSAGE
	}
	
	public void onMessage(Serializable message);
	
	public void onError(ErrorType error);

}
