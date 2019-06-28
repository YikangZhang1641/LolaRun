package rpc;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import db.DBConnection;
import db.DBConnectionFactory;
import entity.Order.OrderBuilder;

/**
 * Servlet implementation class Confirm
 */
@WebServlet("/confirm")
public class Confirm extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Confirm() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		
		DBConnection connection = DBConnectionFactory.getConnection();
	  	 try {
	  		String user_id = request.getParameter("user_id");
			String origin = request.getParameter("start_location");
			String destination = request.getParameter("destination");
			String vehicle = request.getParameter("vehicle");
			
			int distance = Integer.parseInt(request.getParameter("distance"));
			int duration = Integer.parseInt(request.getParameter("duration"));
			double price = Double.parseDouble(request.getParameter("price"));	  		 
	  		
			OrderBuilder builder = new OrderBuilder();
			builder.setUserID(user_id);
			builder.setOriginAddr(origin);
			builder.setDestAddr(destination);
			builder.setDistanceValue(distance);
			builder.setDurationValue(duration);
			builder.setPrice(price);
			builder.setVehicle(vehicle);
			builder.setTimeStamp();
			
	  		connection.saveOrder(builder.build());
	  		RpcHelper.writeJsonObject(response, new JSONObject().put("result", "SUCCESS"));
	  		
	  	 } catch (Exception e) {
	  		 e.printStackTrace();
	  	 } finally {
	  		 connection.close();
	  	 }

		
		
	}

}
