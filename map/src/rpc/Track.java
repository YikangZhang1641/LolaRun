package rpc;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import db.DBConnection;
import db.DBConnectionFactory;

/**
 * Servlet implementation class Track
 */
@WebServlet("/track")
public class Track extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Track() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
//		HttpSession session = request.getSession(false);
//		if (session == null) {
//			response.setStatus(403);
//			return;
//		}
//		
		DBConnection connection = DBConnectionFactory.getConnection();
		String order_id = request.getParameter("order_id");
		String user_id = request.getParameter("user_id");
		
		if (order_id != null) {
			JSONObject obj = connection.trackByID(Integer.parseInt(order_id));
			RpcHelper.writeJsonObject(response, obj);
		} else {
			JSONArray array = connection.trackByUser(user_id);
			RpcHelper.writeJsonArray(response, array);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
