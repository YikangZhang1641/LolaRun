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

	public int saveOrder(Order order);

	public boolean registerUser(String userId, String password, String firstname, String lastname);

	public String getFullname(String userId);

	public JSONObject trackByID(int trackID);

	public JSONArray trackByUser(String user);

	int setPickUpByMachine(int order_id, String vehicle);

	boolean setInTransit(int order_id, int robot_id);

	boolean setDelivered(int order_id, int robot_id);
	
	public boolean[] checkAvailability();
}
