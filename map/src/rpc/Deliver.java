package rpc;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import db.DBConnection;
import db.DBConnectionFactory;

/**
 * Servlet implementation class Deliver
 */
@WebServlet("/deliver")
public class Deliver extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Deliver() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
		DBConnection connection = DBConnectionFactory.getConnection();

		
		int order_id = Integer.parseInt(request.getParameter("order_id"));
		int robot_id = Integer.parseInt(request.getParameter("robot_id"));
		String statusUpdate = request.getParameter("statusUpdate");
		String type = request.getParameter("robotType");
		
		JSONObject res = new JSONObject();
		try {		
			if (statusUpdate.equals("OrderPlaced")) {
				connection.setPickUpByMachine(order_id, type);
			} else if (statusUpdate.equals("PickedUpByMachine")) {
				
			} else if (statusUpdate.equals("InTransit")) {
				
			} else if (statusUpdate.equals("Delivered")) {
				
			} else {
				
			}
		
			res.put("result", "Succeed!");
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		RpcHelper.writeJsonObject(response, res);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
