package pl.jgoslawski.communication.messages;

import java.io.Serializable;

public class Response implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8054288807571955663L;

	private long ID;

	public long getID() {
		return ID;
	}

	private long result;

	public long getResult() {
		return result;
	}

	public Response(long iD, long result) {
		super();
		ID = iD;
		this.result = result;
	}
	
	
}
