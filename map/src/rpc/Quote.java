package rpc;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import entity.Route;
import external.GoogleMapAPI;

/**
 * Servlet implementation class Quote
 */
@WebServlet("/search")
public class Quote extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Quote() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		String origin = request.getParameter("start_location");
		String destination = request.getParameter("end_location");
		
		GoogleMapAPI googleMapAPI = new GoogleMapAPI();
		
		List<Route> routes = googleMapAPI.search(origin, destination);
		
		JSONArray array = new JSONArray();
		try {		
			for (Route r : routes) {
				JSONObject obj = new JSONObject();
				obj.put("distance", r.getDistanceText());
				obj.put("duration", r.getDurationText());
				array.put(obj);
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		RpcHelper.writeJsonArray(response, array);
	}

}
