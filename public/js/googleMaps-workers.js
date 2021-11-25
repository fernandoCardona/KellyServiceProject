// main.js

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
    console.log('dentro de funcion map >>>>>>>>>>>>>>>>><')
       //Mapa
       const map = new google.maps.Map(
         document.getElementById('map'),
         {
           zoom: 10,
           center: undefined
         }
       );
     
       //GeoLocation
       setUserCenter(map)
       
      
       ////Workers
       workerMarkers(map)
       //Extras Google maps
     
   
   }

   function workerMarkers(map) {
   
     axios.get("/worker/api")
     .then((res) => {
       const addresses = res.data.map(service => service.address)
       console.log(addresses) 

       addresses.forEach( address =>{
         GMaps.geocode({
           address: address,
           callback: function(results, status){
             if(status=='OK'){
               var latlng = results[0].geometry.location;
               console.log({
                 lat: latlng.lat(),
                 lng: latlng.lng()
               })
               new google.maps.Marker({
                 position: {
                   lat: latlng.lat(),
                   lng: latlng.lng()
                 },
                 map,
                 title: "Hello World!",
               });
             }
           }
         });
       });


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
   
   //   let serviceInfo = ""
   //   data.reverse().forEach(service => {
   //       serviceInfo += ""
                           
    
     
   //       map.addMarker({
   //         lat: -12.043333,
   //         lng: -77.028333,
   //         title: 'Lima',
   //         click: function(e){
   //           alert('You clicked in this marker');
   //         }
   //       });
   //  });
   
   }
   
   function setUserCenter (map) {
     if (navigator.geolocation) {
   
       navigator.geolocation.getCurrentPosition(
         //callback function for success
         (position) => {
   
           const center = {
             lat: position.coords.latitude,
             lng: position.coords.longitude
           };
   
           // Center map with user location
           console.log("CENTRO", center)
           map.setCenter(center);

           new google.maps.Marker({
            position: center,
            map,
            icon: "/images/avatar.png",
            scale: 2,
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
   
   
   
   