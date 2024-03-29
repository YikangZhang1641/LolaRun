package db.mysql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import db.DBConnection;
import entity.Order;
import entity.Route;
import entity.Order.OrderBuilder;
import external.GoogleMapAPI;

public class MySQLConnection implements DBConnection {
	private Connection conn;
	
	public MySQLConnection(){
		System.out.println();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver").getConstructor().newInstance();
			conn = DriverManager.getConnection(MySQLDBUtil.URL);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void close() {
		// TODO Auto-generated method stub
	  	 if (conn != null) {
	  		 try {
	  			 conn.close();
	  		 } catch (Exception e) {
	  			 e.printStackTrace();
	  		 }
	  	 }
	}

	
	@Override
	public List<Route> searchRoutes(String origin, String destination) {
		// TODO Auto-generated method stub
		GoogleMapAPI googleMapAPI = new GoogleMapAPI();
		List<Route> routes = googleMapAPI.search(origin, destination);
		return routes;
	}
	

	@Override
	public int saveOrder(Order order) {
		// TODO Auto-generated method stub
		if (conn == null) {
			System.err.println("DB connection failed");
			return -1;
		}
		
 		 int id = -1;
		 try {
	  		 String sql = "INSERT IGNORE INTO orders VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)";
	  		 PreparedStatement ps = conn.prepareStatement(sql);
	  		 ps.setString(1, order.getUserID());
//	  		 ps.setString(2, order.getName());
	  		 ps.setString(2, order.getOriginAddr());
	  		 ps.setString(3, order.getDestAddr());
	  		 
//	  		 ps.setInt(4, order.getDistanceValue());
//	  		 ps.setInt(5, order.getDurationValue());
	  		 ps.setString(4, order.getDistanceText());
	  		 ps.setString(5, order.getDurationText());
	  		 
	  		 ps.setString(6, order.getVehicle());
	  		 ps.setDouble(7, order.getPrice());
	  		 ps.setString(8, order.getTimeStamp());;
	  		 ps.setString(9, order.getTrackStatus());
	  		 ps.execute();
	  		
	  		 sql = "SELECT max(order_id) FROM orders;";
	  		 PreparedStatement statement = conn.prepareStatement(sql);
	  		 ResultSet rs = statement.executeQuery();
	  		 while (rs.next()) {
	  			 //id = rs.getInt(1);
	  			 id = rs.getInt("max(order_id)");
	  		 }
	  		
	  	 } catch (Exception e) {
	  		 e.printStackTrace();
	  	 }
		 return id;
	}

	
	@Override
	public String getFullname(String userId) {
		// TODO Auto-generated method stub
		if (conn == null) {
			return "";
		}		
		String name = "";
		try {
			String sql = "SELECT first_name, last_name FROM users WHERE user_id = ? ";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, userId);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				name = rs.getString("first_name") + " " + rs.getString("last_name");
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return name;

	}
	
	
	@Override
	public boolean registerUser(String userId, String password, String firstname, String lastname) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return false;
		}

		try {
			String sql = "INSERT IGNORE INTO users VALUES (?, ?, ?, ?)";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, userId);
			ps.setString(2, password);
			ps.setString(3, firstname);
			ps.setString(4, lastname);
			
			return ps.executeUpdate() == 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;	
	}
	
	
	@Override
	public boolean verifyLogin(String userId, String password) {
		// TODO Auto-generated method stub
		if (conn == null) {
			return false;
		}
		try {
			String sql = "SELECT user_id FROM users WHERE user_id = ? AND password = ?";
			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setString(1, userId);
			stmt.setString(2, password);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return true;
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return false;
	}
	
	@Override
	public JSONObject trackByID(int trackID) {
		// TODO Auto-generated method stub
		if (conn == null) {
			return null;
		}
		
		JSONObject obj = new JSONObject();
		try {
			String sql = "SELECT * from orders WHERE order_id = ?";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setInt(1, trackID);
			
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				obj.put("order_id", rs.getInt("order_id"));
				obj.put("user_id", rs.getString("user_id"));
				obj.put("origin", rs.getString("origin"));
				obj.put("destination", rs.getString("destination"));
				obj.put("vehicle", rs.getString("vehicle"));
				obj.put("time_stamp", rs.getString("time_stamp"));
				obj.put("track_status", rs.getString("track_status"));
				
				obj.put("distance", rs.getString("distance"));
				obj.put("duration", rs.getString("duration"));
				
				obj.put("price", rs.getDouble("price"));
				obj.put("robot_id", rs.getDouble("robot_id"));

			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return obj;
	}
	
	
	@Override
	public JSONArray trackByUser(String user) {
		// TODO Auto-generated method stub
		if (conn == null) {
			return null;
		}
		
		JSONArray array = new JSONArray();
		try {
			String sql = "SELECT * from orders WHERE user_id = ?";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, user);
			
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				JSONObject obj = new JSONObject();
				obj.put("order_id", rs.getInt("order_id"));
				obj.put("user_id", rs.getString("user_id"));
				obj.put("origin", rs.getString("origin"));
				obj.put("destination", rs.getString("destination"));
				obj.put("vehicle", rs.getString("vehicle"));
				obj.put("time_stamp", rs.getString("time_stamp"));
				obj.put("track_status", rs.getString("track_status"));
				
//				obj.put("distance", rs.getInt("distance"));
//				obj.put("duration", rs.getInt("duration"));
				obj.put("distance", rs.getString("distance"));
				obj.put("duration", rs.getString("duration"));
				obj.put("price", rs.getDouble("price"));
				
				array.put(obj.toString());
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return array;
	}
	
	
	@Override
	public int setPickUpByMachine(int order_id, String type) {
//		if (conn == null) {
//			return false;
//		}
		
		String track_status = null;
		int robot_id = -1;	
		try {
			// check if order status valid
			String sql = "SELECT * from orders WHERE order_id = ?";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setInt(1, order_id);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				track_status = rs.getString("track_status");
			}
			if (track_status == null || !track_status.equals("OrderPlaced")) {
				System.out.println("Status Failure.");
				return -1;
			}
			
			// check if robot status valid
			sql = "SELECT * from robots WHERE busy = false AND type = ?";
			statement = conn.prepareStatement(sql);
			statement.setString(1, type);
			rs = statement.executeQuery();

			while (rs.next()) {
				robot_id = rs.getInt("robot_id");
				break;
			}
			if (robot_id == -1) {
				System.out.println("No robots available.");
				return -1;
			}
			
			// update order and robot
			sql = "UPDATE robots SET busy = true, order_id = ?, time_stamp = ? WHERE robot_id = ?";
			statement = conn.prepareStatement(sql);
			statement.setInt(1, order_id);
			statement.setString(2, new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date()));
			statement.setInt(3, robot_id);
			statement.execute();

			sql = "UPDATE orders SET track_status = 'PickedUpByMachine', robot_id = ? WHERE order_id = ?";
			statement = conn.prepareStatement(sql);
			statement.setInt(1, robot_id);
			statement.setInt(2, order_id);
			statement.execute();

			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return robot_id;
	}
	
	@Override 
	public boolean setInTransit(int order_id, int robot_id) {
		String track_status = null;
		
		try {
			// check if order status valid
			String sql = "SELECT * from orders WHERE order_id = ?";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setInt(1, order_id);
			
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				track_status = rs.getString("track_status");
				break;
			}
			
			if (!track_status.equals("PickedUpByMachine")) {
				System.out.println("Status Failure.");
				return false;
			}
			
			// check if robot status valid
			sql = "SELECT * from robots WHERE robot_id = ?";
			statement = conn.prepareStatement(sql);
			statement.setInt(1, robot_id);
			rs = statement.executeQuery();

			int check_id = -1;
			while (rs.next()) {
				check_id = rs.getInt("robot_id");
				break;
			}
			if (check_id == -1 || check_id != robot_id) {
				System.out.println("Robot ID unavailable.");
				return false;
			}
			
			// update order and robot
			sql = "UPDATE orders SET track_status = 'InTransit', time_stamp = ? WHERE order_id = ?";
			statement = conn.prepareStatement(sql);
			statement.setString(1, new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date()));
			statement.setInt(2, order_id);
			statement.execute();

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return true;
	}
	
	@Override 
	public boolean[] checkAvailability() {
		boolean[] availabilityArray = new boolean[2];
		if (conn == null) {
			return availabilityArray;
		}
		try {
			String sql_drone = "SELECT * from robots WHERE busy = 0 AND type = 'drone'";
			PreparedStatement statement = conn.prepareStatement(sql_drone);
			ResultSet rs = statement.executeQuery();
			if (rs.next()) {
				availabilityArray[0] = true;
			}
			
			String sql_robot = "SELECT * from robots WHERE busy = 0 AND type = 'robot'";
			statement = conn.prepareStatement(sql_robot);
			rs = statement.executeQuery();
			if (rs.next()) {
				availabilityArray[1] = true;
			}
			return availabilityArray;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return availabilityArray;
	}
	
	@Override 
	public boolean setDelivered(int order_id, int robot_id) {
		String track_status = null;
		
		try {
			// check if order status valid
			String sql = "SELECT * from orders WHERE order_id = ?";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setInt(1, order_id);
			
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				track_status = rs.getString("track_status");
				break;
			}
			
			if (!track_status.equals("InTransit")) {
				System.out.println("Status Failure.");
				return false;
			}
			
			// check if robot status valid
			sql = "SELECT * from robots WHERE robot_id = ?";
			statement = conn.prepareStatement(sql);
			statement.setInt(1, robot_id);
			rs = statement.executeQuery();

			int check_id = -1;
			while (rs.next()) {
				check_id = rs.getInt("robot_id");
				break;
			}
			if (check_id == -1 || check_id != robot_id) {
				System.out.println("Robot ID unavailable.");
				return false;
			}
			
			// update order and robot
			sql = "UPDATE orders SET track_status = 'Delivered', robot_id = NULL WHERE order_id = ?";
			statement = conn.prepareStatement(sql);
			statement.setInt(1, order_id);
			statement.execute();
			
			sql = "UPDATE robots SET busy = false, time_stamp = ? WHERE order_id = ?";
			statement = conn.prepareStatement(sql);
			statement.setString(1, new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date()));
			statement.setInt(2, order_id);
			statement.execute();
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return true;
	}
}
