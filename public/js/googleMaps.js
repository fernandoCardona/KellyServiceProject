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
  }
  
  
  function placeMarkers(map) {
  
    const myMarker = new google.maps.Marker({
      position: {
        lat: 41.3977381,
        lng: 2.190471916
      },
      map: map,
      title: "Barcelona Campus"
    });
  
    new google.maps.Marker({
      position: {
        lat: 41.4277381,
        lng: 2.190471916
      },
      map: map,
      title: "Barcelona Campus"
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