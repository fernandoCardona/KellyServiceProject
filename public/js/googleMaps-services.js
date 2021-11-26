let userCenter; 

const getCurrentLocation = async () => {
    if (navigator.geolocation) {
   
        return await navigator.geolocation.getCurrentPosition(
            //callback function for success
            (position) => {
      
              const center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
      
              // Center map with user location
              userCenter = center;
              return center;
            }
        )
        

    }
    
}

function startMap() {
    //Mapa
    const map = new google.maps.Map(
      document.getElementById('map'),
      {
        zoom: 11,
        center: undefined
      }
    );
  
    //GeoLocation
    setUserCenter(map)
    
    ////// Markers
    placeMarkers(map)
    
}

function placeMarkers(map) {


  axios.get("/services/api")
  .then((res) => {
    const addresses = res.data.map(service => service.address)
    addresses.forEach( address =>{
      GMaps.geocode({
        address: address,
        callback: function(results, status){
          if(status=='OK'){
            var latlng = results[0].geometry.location;
            // console.log({
            //   lat: latlng.lat(),
            //   lng: latlng.lng()
            // })
            new google.maps.Marker({
              position: {
                lat: latlng.lat(),
                lng: latlng.lng()
              },
              map,
              title: "Workers!",
            });
          }
        }
      });
    }) 
  
    new google.maps.Marker({
        position: userCenter,
        map,
        title: "My position!",
    }); 
  })
  .catch(error => {
    console.log(error)
    //res.render('message', { errorMessage: "Marker no ha podido ser enviado" })
  })

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
        
        var image = {
          url: "/images/avatar.png", // url
          scaledSize: new google.maps.Size(25, 25), // size
        };
        new google.maps.Marker({
          position: center,
          map,
          icon: image,
          title: "Mi posición",
        });

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



