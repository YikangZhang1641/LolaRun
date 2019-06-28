package db;

import java.util.List;

import entity.Order;
import entity.Route;

public interface DBConnection {
	public void close();
	
	public boolean verifyLogin(String userId, String password);

	public List<Route> searchRoutes(String origin, String destination);

	void saveOrder(Order order);
}
