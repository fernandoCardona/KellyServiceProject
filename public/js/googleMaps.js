// main.js
function startMap() {
 console.log('dentro de funcion map >>>>>>>>>>>>>>>>><')
    //Mapa
    const ironhackBCN = {
      lat: 41.3977381,
      lng: 2.190471916
    };
    const map = new google.maps.Map(
      document.getElementById('map'),
      {
        zoom: 14,
        center: ironhackBCN
      }
    );
  
    ////// Markers
    placeMarkers(map)
  
    //GeoLocation
    setUserCenter(map)
    
    //Extras Google maps
  

}

function placeMarkers(map) {

  axios.get("/services/api")
  .then((res) => {
    console.log(res)  
    
  })
  .catch(error => {
    console.log(error)
    res.render('message', { errorMessage: "Marker no ha podido ser enviado" })
  })
  
  map.addMarker({
    lat: -12.043333,
    lng: -77.028333,
    title: 'Lima',
    click: function(e){
      alert('You clicked in this marker');
    }
  });


}

function setUserCenter(map) {
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(
      //callback function for success
      (position) => {

        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        

        // Center map with user location
        map.setCenter(center);

      },

      //Callback function if something goes wrong
      () => {
        console.log('Error in the geolocation service.');
      });

  } else {
    // Browser says: Nah! I do not support this.
    console.log('Browser does not support geolocation.');
  }
}



