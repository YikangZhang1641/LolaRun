const functions = require("firebase-functions");
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
//var serviceAccount = require("/Users/stanleyguan/LolaRun/firebase/package-e598a-56642fe62a37.json");
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyA_AmDpSbdabR6LEAaThwUyByXQG-MQQF8',
  Promise: Promise
});
/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://package-e598a.firebaseio.com/"
});
*/

admin.initializeApp()


const database = admin.database();
var geocoder = googleMapsClient;
var id


exports.addOrder = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method !== 'POST') {
      return res.status(401).json({
        message: 'Not allowed'
      })
    }
  
    const order = JSON.stringify(req.body)
    const obj = JSON.parse(order)
    id = obj.id
    const start = obj.start_location
    const end = obj.end_location

	geocoder.geocode({'address': start})
		.asPromise()
		.then((response) => {
			location = response.json.results[0].geometry.location
			database.ref('/track/' + id + '/id').set(id)
			database.ref('/track/' + id + '/slat').set(location.lat)
			database.ref('/track/' + id + '/slng').set(location.lng)
			return location

		})
		.catch((err) => {
			console.log(err)
		})

	geocoder.geocode({'address': end})
		.asPromise()
		.then((response) => {
			location = response.json.results[0].geometry.location
			database.ref('/track/' + id + '/id').set(id)
			database.ref('/track/' + id + '/elat').set(location.lat)
			database.ref('/track/' + id + '/elng').set(location.lng)
			database.ref('/t1/' + id + '/elat').set(location.lat)
			database.ref('/t1/' + id + '/elng').set(location.lng)
			return location

		})
		.catch((err) => {
			console.log(err)
		})

	database.ref('/t1/' + id + '/trackResult').set(1)

	var time = 30 
	var slices = 30
	var i = setInterval(() => {
		var trackDB = database.ref('/track/' + id)
		trackDB.on("value", function(snapshot) {
		  if(time === 0) {
		  	clearInterval(i)
		  	database.ref('/t1/' + id + '/trackResult').set(2)
		  }

		  var curlat = snapshot.val().slat
		  var curlng = snapshot.val().slng
		  var endlat = snapshot.val().elat
		  var endlng = snapshot.val().elng

		  var latdiff = endlat - curlat
		  var lngdiff = endlng - curlng
		  var latdelta = (latdiff/slices) * (slices - time)
		  var lngdelta = (lngdiff/slices) * (slices - time)
		  time --
		  database.ref('/t1/' + id + '/slat').set(curlat + latdelta)
		  database.ref('/t1/' + id + '/slng').set(curlng + lngdelta)
	})}, 1000 * 2)

	database.ref('/orders/' + id).set(order)
	let items = [];

	return database.ref('orders').on('value', (snapshot) => {
	  snapshot.forEach((item) => {
	    items.push({
	      id: item.key,
	      item: item.val().id
	    });
	  });   
	  res.status(200).json(items);
	}, (error) => {
	  res.status(error.code).json({
	    message: `Something went wrong. ${error.message}`
	  })
	})
  })
})


async function startTracking(robotType, time) {
	var trackDB = database.ref('/track/' + id)
	trackDB.once("value", function(snapshot) {
	  var curlat = snapshot.val().slat
	  var curlng = snapshot.val().slng
	  var endlat = snapshot.val().elat
	  var endlng = snapshot.val().elng

	  var latdiff = endlat - curlat
	  var lngdiff = endlng - endlng
	  var latdelta = latdiff/time
	  var lngdelta = lngdiff/time

	  console.log(curlat + " " + curlng)
	  console.log(endlat + " " + endlng)
	  var counter = 0
	  var i = setInterval(function() {
	  		if(counter === time) {
	  			clearInterval(i)
	  		}
			console.log(curlat + " " + curlng)
	  		curlat = curlat + latdelta
	  		curlng = curlng + lngdelta
	  		counter ++
	  	}, 1000)
	  
	});

}


