package external;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import entity.Route;
import entity.Route.RouteBuilder;

public class GoogleMapAPI {
	private static final double k = 300;
	private static final String URL = "https://maps.googleapis.com/maps/api/distancematrix";
	private static final String DEFAULT_FORMAT = "json"; 
//	private static final String DEFAULT_UNITS = "imperial"; 
	private static final String API_KEY = "AIzaSyA_AmDpSbdabR6LEAaThwUyByXQG-MQQF8";
	
	public List<Route> search(String origin, String destination) {		
		try {
			origin = URLEncoder.encode(origin, "UTF-8");
			destination = URLEncoder.encode(destination, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		String query = String.format("origins=%s&destinations=%s&key=%s", origin, destination, API_KEY);
		String url = URL + '/' + DEFAULT_FORMAT + "?" + query;
	
		try {
			HttpURLConnection connection;
			connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setRequestMethod("GET");
			
			int responseCode = connection.getResponseCode();
			System.out.println("Sending request to url: " + url);
			System.out.println("Response code: " + responseCode);
			
			if (responseCode != 200) {
				return new ArrayList<>();
			}
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			StringBuilder response = new StringBuilder();
			
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}
			reader.close();
			JSONObject obj = new JSONObject(response.toString());
			
			return getRouteList(obj);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ArrayList<>();
	}

	private List<Route> getRouteList(JSONObject obj) {
		// TODO Auto-generated method stub
		if (obj.isNull("rows")) {
			return new ArrayList<>();
		}
		List<Route> routeList = new ArrayList<>();
		
		try {
			JSONArray rows = obj.getJSONArray("rows");
			
		
			for (int i = 0; i < rows.length(); i++) {
				JSONObject row = rows.getJSONObject(i);
				JSONArray elements = row.getJSONArray("elements");
				
				for (int j = 0; j < row.length(); j++) {
					JSONObject element = elements.getJSONObject(j);
					RouteBuilder rb = new RouteBuilder();
					
					rb.setOriginAddr(obj.getJSONArray("origin_addresses").getString(0));
					rb.setDestAddr(obj.getJSONArray("destination_addresses").getString(0));
					
					if (!element.isNull("duration")) {
						rb.setDurationText(element.getJSONObject("duration").getString("text"));
						rb.setDurationValue(element.getJSONObject("duration").getInt("value"));
					}
					if (!element.isNull("distance") ) {
						rb.setDistanceText(element.getJSONObject("distance").getString("text"));
						rb.setDistanceValue(element.getJSONObject("distance").getInt("value"));
					}
					if (!element.isNull("duration_in_traffic")) {
						rb.setTrafficDurationText(element.getJSONObject("duration_in_traffic").getString("text"));
						rb.setTrafficDurationValue(element.getJSONObject("duration_in_traffic").getInt("value"));
					}
					routeList.add(rb.build());
				}
			}
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		return routeList;
	}
	
	private double[] latlng(String s) {
		double[] res = new double[] {-1, -1};
		String link = "https://maps.googleapis.com/maps/api/geocode/json?address=" + s + "&key=" + API_KEY;
		
		try {
			HttpURLConnection connection;
			connection = (HttpURLConnection) new URL(link).openConnection();
			connection.setRequestMethod("GET");int responseCode = connection.getResponseCode();
			System.out.println("Sending request to url: " + link);
			System.out.println("Response code: " + responseCode);
			
			if (responseCode != 200) {
				return res;
			}
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			StringBuilder response = new StringBuilder();
			
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}
			reader.close();
			JSONObject obj = new JSONObject(response.toString());
			JSONArray array = obj.getJSONArray("results");
			JSONObject loc = array.getJSONObject(0).getJSONObject("geometry").getJSONObject("location");
			res[0] = loc.getDouble("lat");
			res[1] = loc.getDouble("lng");
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return res;
	}
	
	
	public double flightPrice(String origin, String destination) {
		try {
			origin = URLEncoder.encode(origin, "UTF-8");
			destination = URLEncoder.encode(destination, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
			
		double[] ori_loc = latlng(origin);
		double[] des_loc = latlng(destination);

		double dis = Math.sqrt( Math.pow((ori_loc[0] - des_loc[0]), 2) + Math.pow((ori_loc[1] - des_loc[1]), 2) );
		
		return dis * k;
	}
	
}
