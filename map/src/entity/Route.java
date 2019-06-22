package entity;

public class Route {
	private String origin_addresses;
	private String destination_addresses;
	private int duration;
	private int duration_in_traffic;
	private int distance;
	
	private Route(RouteBuilder rb) {
		this.origin_addresses = rb.origin_addresses;
		this.destination_addresses = rb.destination_addresses;
		this.duration = rb.duration;
		this.duration_in_traffic = rb.duration_in_traffic;
		this.distance = rb.distance;
	}
	
	public static class RouteBuilder {
		private String origin_addresses;
		private String destination_addresses;
		private int duration;
		private int duration_in_traffic;
		private int distance;
		
		public RouteBuilder setOriginAddr(String origin_addresses) {
			this.origin_addresses = origin_addresses;
			return this;
		}

		public RouteBuilder setDestAddr(String destination_addresses) {
			this.destination_addresses = destination_addresses;
			return this;
		}
		
		public RouteBuilder setDuration(int duration) {
			this.duration = duration;
			return this;
		}
		
		public RouteBuilder setTrafficDuration(int duration_in_traffic) {
			this.duration_in_traffic = duration_in_traffic;
			return this;
		}
		
		public RouteBuilder setDistance(int distance) {
			this.distance = distance;
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
	
	public int getDuration() {
		return this.duration;
	}
	
	public int getTrafficDuration() {
		return this.duration_in_traffic;
	}
	
	public int getDistance() {
		return this.distance;
	}		
}
