package pl.jgoslawski.communication.api.exceptions;

import java.io.Serializable;

public class CouldNotSendMessageException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 9175769700052158725L;

	private Serializable messageWhichNotSent;

	public Serializable getMessageWhichNotSent() {
		return messageWhichNotSent;
	}

	public void setMessageWhichNotSent(Serializable messageWhichNotSent) {
		this.messageWhichNotSent = messageWhichNotSent;
	}

	public CouldNotSendMessageException(Serializable messageWhichNotSent,
			String exceptionMessage) {
		super(exceptionMessage);
		this.messageWhichNotSent = messageWhichNotSent;
	}

}
