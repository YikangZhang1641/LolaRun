package entity;

public class Route {
	private String origin_addresses;
	private String destination_addresses;
	
	private String duration_text;
	private String duration_in_traffic_text;
	private String distance_text;
	
	private int duration_value;
	private int duration_in_traffic_value;
	private int distance_value;
	
	private Route(RouteBuilder rb) {
		this.origin_addresses = rb.origin_addresses;
		this.destination_addresses = rb.destination_addresses;
		this.duration_text = rb.duration_text;
		this.duration_in_traffic_text = rb.duration_in_traffic_text;
		this.distance_text = rb.distance_text;
		this.duration_value = rb.duration_value;
		this.duration_in_traffic_value = rb.duration_in_traffic_value;
		this.distance_value = rb.distance_value;
	}
	
	public static class RouteBuilder {
		private String origin_addresses;
		private String destination_addresses;
		
		private String duration_text;
		private String duration_in_traffic_text;
		private String distance_text;
		
		private int duration_value;
		private int duration_in_traffic_value;
		private int distance_value;
		
		public RouteBuilder setOriginAddr(String origin_addresses) {
			this.origin_addresses = origin_addresses;
			return this;
		}

		public RouteBuilder setDestAddr(String destination_addresses) {
			this.destination_addresses = destination_addresses;
			return this;
		}
		
		public RouteBuilder setDurationValue(int duration_value) {
			this.duration_value = duration_value;
			return this;
		}

		public RouteBuilder setDurationText(String duration_text) {
			this.duration_text = duration_text;
			return this;
		}
		
		public RouteBuilder setTrafficDurationValue(int duration_in_traffic_value) {
			this.duration_in_traffic_value = duration_in_traffic_value;
			return this;
		}
		
		public RouteBuilder setTrafficDurationText(String duration_in_traffic_text) {
			this.duration_in_traffic_text = duration_in_traffic_text;
			return this;
		}

		public RouteBuilder setDistanceValue(int distance_value) {
			this.distance_value = distance_value;
			return this;
		}
		
		public RouteBuilder setDistanceText(String distance_text) {
			this.distance_text = distance_text;
			return this;
		}		
		
		public Route build() {
			return new Route(this);
		}
	}
	
	public String getOriginAddr() {
		return this.origin_addresses;
	}

	public String getDestAddr() {
		return this.destination_addresses;
	}
	
	public String getDurationText() {
		return this.duration_text;
	}
	
	public int getDurationValue() {
		return this.duration_value;
	}
	
	public String getTrafficDurationText() {
		return this.duration_in_traffic_text;
	}
	
	public int getTrafficDurationValue() {
		return this.duration_in_traffic_value;
	}

	public String getDistanceText() {
		return this.distance_text;
	}		
	
	public int getDistanceValue() {
		return this.distance_value;
	}		
}
