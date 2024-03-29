package entity;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Order {
	private String user_id;
//	private int order_id;
	private String origin;
	private String destination;
	private String time_stamp;
	private String vehicle;
	private String track_status;
	
	private String distance_text;
	private String duration_text;
	private int duration;
	private int distance;
	private double price;
	
	private Order(OrderBuilder ob) {
		this.user_id = ob.user_id;
//		this.order_id = ob.order_id;
		this.origin = ob.origin;
		this.destination = ob.destination;
		this.time_stamp = ob.time_stamp;
		
		this.distance_text = ob.distance_text;
		this.duration_text = ob.duration_text;		
		this.distance = ob.distance;
		this.duration = ob.duration;
		
		this.price = ob.price;
		this.vehicle = ob.vehicle;
		this.track_status = ob.track_status;
	}
	
	public static class OrderBuilder {
		private String user_id;
		private int order_id;
		
		private String origin;
		private String destination;
		private String time_stamp;
		private String vehicle;
		private String track_status;
		
		private String distance_text;
		private String duration_text;
		private int distance;
		private int duration;
		
		private double price;
		
		
		public OrderBuilder setUserID(String user_id) {
			this.user_id = user_id;
			return this;
		}
		
		public OrderBuilder setOriginAddr(String origin) {
			this.origin = origin;
			return this;
		}

		public OrderBuilder setDestAddr(String destination) {
			this.destination = destination;
			return this;
		}
		
		public OrderBuilder setDurationValue(int duration_value) {
			this.duration = duration_value;
			return this;
		}

		public OrderBuilder setDurationText(String duration_text) {
			this.duration_text = duration_text;
			return this;
		}
		
//		public OrderBuilder setTrafficDurationValue(int duration_in_traffic_value) {
//			this.duration_in_traffic_value = duration_in_traffic_value;
//			return this;
//		}
//		
//		public OrderBuilder setTrafficDurationText(String duration_in_traffic_text) {
//			this.duration_in_traffic_text = duration_in_traffic_text;
//			return this;
//		}

		public OrderBuilder setDistanceValue(int distance_value) {
			this.distance = distance_value;
			return this;
		}
		
		public OrderBuilder setDistanceText(String distance_text) {
			this.distance_text = distance_text;
			return this;
		}		
		
		public OrderBuilder setTimeStamp() {
			this.time_stamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
			return this;
		}
		
		public OrderBuilder setPrice(double price) {
			this.price = price;
			return this;
		}
		
		public OrderBuilder setVehicle(String vehicle) {
			this.vehicle = vehicle;
			return this;
		}
		
		public OrderBuilder setTrackStatus(String track_status) {
			this.track_status = track_status;
			return this;
		}
		
		public Order build() {
			return new Order(this);
		}
	}

	public String getUserID() {
		return this.user_id;
	}
	
	public String getOriginAddr() {
		return this.origin;
	}

	public String getDestAddr() {
		return this.destination;
	}
	
	public String getDurationText() {
		return this.duration_text;
	}
	
	public int getDurationValue() {
		return this.duration;
	}
	
//	public String getTrafficDurationText() {
//		return this.duration_in_traffic_text;
//	}
	
//	public int getTrafficDurationValue() {
//		return this.duration_in_traffic_value;
//	}

	public String getDistanceText() {
		return this.distance_text;
	}		
	
	public int getDistanceValue() {
		return this.distance;
	}		
	
	public String getTimeStamp() {
		return this.time_stamp;
	}
	
	public double getPrice() {
		return this.price;
	}
	
	public String getVehicle() {
		return this.vehicle;
	}
	
	public String getTrackStatus() {
		return this.track_status;
	}
}
