package pl.jgoslawski.communication.activemq;

import javax.jms.Connection;
import javax.jms.JMSException;

import org.apache.activemq.ActiveMQConnectionFactory;

import pl.jgoslawski.communication.api.ConnectionsManager;
import pl.jgoslawski.communication.api.exceptions.CouldNotReturnConnectionException;


public class ActiveMQConnectionsManager implements ConnectionsManager<Connection> {

	private ActiveMQConnectionFactory connectionFactory;
	
	private Connection connection;
	
	public ActiveMQConnectionsManager(String brokerUrl)
	{
		connectionFactory = new ActiveMQConnectionFactory(brokerUrl);
	}
	
	@Override
	public Connection getConnection() throws CouldNotReturnConnectionException {
		try {
			if(connection == null){
				connection =  connectionFactory.createConnection();
				connection.start();
			}
		} catch (JMSException e) {
			throw new CouldNotReturnConnectionException(e.getMessage());
		}
		return connection;
	}


	@Override
	public void cleanUp() {
		try {
			connection.stop();
		} catch (JMSException e) {
		}	
	}

}
