package entity;

public class Robot {
	private String type;
	private boolean busy;
	private int order_id;
	private String position;
	
	public Robot setType(String type) {
		this.type = type;
		return this;
	}	
	
	public Robot setBusy(boolean busy) {
		this.busy = busy;
		return this;
	}	
	
	public Robot setOrder(int order_id) {
		this.order_id = order_id;
		return this;
	}	
	
	public Robot setPosition(String position) {
		this.position = position;
		return this;
	}	
	
	public String getType() {
		return this.type;
	}

	public boolean getBusy() {
		return this.busy;
	}
	
	public int getOrderID() {
		return this.order_id;
	}
	
	public String getPosition() {
		return this.position;
	}
}
