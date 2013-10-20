package pl.jgoslawski.communication.messages;

import java.io.Serializable;

public class Request implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8291435832942978479L;
	
	private long ID;
	private long A;
	private long B;

	public long getID() {
		return ID;
	}

	public long getA() {
		return A;
	}

	public long getB() {
		return B;
	}

	public Request(long iD, long a, long b) {
		super();
		ID = iD;
		A = a;
		B = b;
	}

	
	
	 
	
}
