package db;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import entity.Order;
import entity.Route;

public interface DBConnection {
	public void close();
	
	public boolean verifyLogin(String userId, String password);

	public List<Route> searchRoutes(String origin, String destination);

	void saveOrder(Order order);

	boolean registerUser(String userId, String password, String firstname, String lastname);

	String getFullname(String userId);

	JSONObject trackByID(int trackID);

	JSONArray trackByUser(String user);
}
