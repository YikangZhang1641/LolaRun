package rpc;

import java.io.IOException;
import java.text.DecimalFormat;
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
		double filght_price = googleMapAPI.flightPrice(origin, destination);
		if (routes.isEmpty()) {
			response.setStatus(406);
			response.getWriter().println("Address Not Available!");
		}
		
		JSONArray array = new JSONArray();
		try {		
			for (Route r : routes) {
				JSONObject Robj = new JSONObject();
				Robj.put("distance", r.getDistanceText());
				Robj.put("duration", r.getDurationText());
				
				Robj.put("robotType", "robot");
				Robj.put("price", new DecimalFormat("#.##").format(r.getDistanceValue() * 0.001));
				array.put(Robj);
			}
			for (Route r : routes) {
				JSONObject Dobj = new JSONObject();
				Dobj.put("distance", r.getDistanceText());
				Dobj.put("duration", r.getDurationText());
				Dobj.put("robotType", "drone");
				Dobj.put("price", new DecimalFormat("#.##").format(filght_price));
				array.put(Dobj);
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		RpcHelper.writeJsonArray(response, array);
	}

}
