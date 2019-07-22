package db.mysql;

import java.sql.DriverManager;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.sql.Connection;

public class MySQLTableCreation {
	// Run this as Java application to reset db schema.
		public static void main(String[] args) {
			try {
				// Step 1 Connect to MySQL.
				System.out.println("Connecting to " + MySQLDBUtil.URL);
				Class.forName("com.mysql.cj.jdbc.Driver").getConstructor().newInstance();
				Connection conn = DriverManager.getConnection(MySQLDBUtil.URL);
				
				if (conn == null) {
					System.out.println("Connection failed");
					return;
				}
				
				// Step 2 Drop tables in case they exist.
				Statement statement = conn.createStatement();
				String sql;

				sql = "DROP TABLE IF EXISTS robots";
				statement.executeUpdate(sql);	
				
				sql = "DROP TABLE IF EXISTS orders";
				statement.executeUpdate(sql);	
				
				sql = "DROP TABLE IF EXISTS users";
				statement.executeUpdate(sql);			

				// Step 3 Create new tables
				sql = "CREATE TABLE users ("
						+ "user_id VARCHAR(255) NOT NULL,"
						+ "password VARCHAR(255) NOT NULL,"
						+ "first_name VARCHAR(255),"
						+ "last_name VARCHAR(255),"
						+ "PRIMARY KEY (user_id)"
						+ ")";
				statement.executeUpdate(sql);
				
				sql = "CREATE TABLE orders ("
						+ "order_id int NOT NULL AUTO_INCREMENT,"
						+ "user_id VARCHAR(255) NOT NULL,"
						+ "origin VARCHAR(255),"
						+ "destination VARCHAR(255),"
						+ "distance VARCHAR(255),"
						+ "duration VARCHAR(255),"
						+ "vehicle VARCHAR(255),"
						+ "price DOUBLE,"
						+ "time_stamp VARCHAR(255),"
						+ "track_status VARCHAR(255),"
						+ "robot_id int,"
						+ "PRIMARY KEY (order_id),"
						+ "FOREIGN KEY (user_id) REFERENCES users(user_id)"
						+ ")";
				statement.executeUpdate(sql);


				sql = "CREATE TABLE robots ("
						+ "robot_id int NOT NULL,"
						+ "type VARCHAR(255),"
						+ "busy boolean,"
						+ "order_id int,"
						+ "position VARCHAR(255),"
						+ "time_stamp VARCHAR(255),"
						+ "PRIMARY KEY (robot_id)"
						+ ")";
				statement.executeUpdate(sql);
//
//				sql = "CREATE TABLE history ("
//						+ "user_id VARCHAR(255) NOT NULL,"
//						+ "item_id VARCHAR(255) NOT NULL,"
//						+ "last_favor_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,"
//						+ "PRIMARY KEY (user_id, item_id),"
//						+ "FOREIGN KEY (user_id) REFERENCES users(user_id),"
//						+ "FOREIGN KEY (item_id) REFERENCES items(item_id)"
//						+ ")";
//				statement.executeUpdate(sql);

				
				// Step 4: insert fake user 1111/3229c1097c00d497a0fd282d586be050
				sql = "INSERT INTO users VALUES('1111', '3229c1097c00d497a0fd282d586be050', 'John', 'Smith')";
				statement.executeUpdate(sql);
				
				for (int i = 0; i < 20; i++) {
					String s = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
					sql = String.format("INSERT INTO robots VALUES('%d', 'drone', %b, '%d', 'origin', '%s')", i, false, -1, s);
					statement.executeUpdate(sql);
				}
				
				for (int i = 21; i < 40; i++) {
					String s = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
					sql = String.format("INSERT INTO robots VALUES('%d', 'robot', %b, '%d', 'origin', '%s')", i, false, -1, s);
					statement.executeUpdate(sql);
				}				
				  
				conn.close();
				System.out.println("Import done successfully");

			} catch (Exception e) {
				e.printStackTrace();
			}
		}

}
