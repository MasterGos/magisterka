package pl.jgoslawski;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Main {

	public static void main(String[] args) {		
	    Logger logger = LogManager.getLogger(Main.class);
		//DOMConfigurator.configure("log4j.xml");
		logger.info("Hello World");
	}

}
