import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Firebase from 'firebase'
import config from './config'

var curlat
var curlng
var endlat
var endlng

const destIcon = {
      url: 'https://dumielauxepices.net/sites/default/files/home-icons-marker-640998-3406219.svg',
      scaledSize: {height: 20, width: 20},
      anchor: { x: 10, y: 10 }
    }

const droneIcon = {
      url: 'https://cdn1.iconfinder.com/data/icons/drones-4/512/pointer-geo-location-drone-navigation-512.png',
      scaledSize: {height: 20, width: 20},
      anchor: { x: 10, y: 10 }
    }


export class MapContainer extends React.Component {
	constructor(props) {
		super(props)
		if (!Firebase.apps.length) {
			Firebase.initializeApp(config)
		}
		this.state = { fetchingData: true,
					   lat: 0,
					   lng: 0
		}
	}


	componentDidMount() {
		let ref = Firebase.database().ref('/t1/' + this.props.trackingNumber )
		ref.on('value', snapshot => {
		  curlat = snapshot.val().slat
		  curlng = snapshot.val().slng
		  endlat = snapshot.val().elat
		  endlng = snapshot.val().elng
		  

		  this.setState({fetchingData : false,
		  				 lat: curlat,
		  				 lng: curlng
		  				});

		})
	}


	displayDrone = () => {
		return <Marker  icon={droneIcon}
			position={{
			lat: this.state.lat,
			lng: this.state.lng
		}} />
	}

	displayDestination = () => {
		return <Marker  
			icon={destIcon}
			position={{
				lat: endlat,
				lng: endlng
			}} 
		/>
	}

	render() {  
		if(this.state.fetchingData) return null;
		else
		    return (
		    	<div style={{height: '400px', width: '700px'}}>
		        <Map
		          google={this.props.google}
		          zoom={9}
		          initialCenter={{ lat: (endlat + curlat)/2, lng: (endlng + endlng)/2 }}
		          style={{height: '400px', width: '550px'}}
		        >
		        	{this.displayDestination()}
		        	{this.displayDrone()}
		        </Map>
		        </div>
		    );
  	}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA_AmDpSbdabR6LEAaThwUyByXQG-MQQF8'
})(MapContainer);