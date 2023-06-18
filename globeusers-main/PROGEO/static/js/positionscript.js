// Wait for the DOM to be ready
$(document).ready(function() {

    // Check if the geolocation API is available
    if (navigator.geolocation) {
  
      // Ask the user for permission to access their location
      navigator.geolocation.getCurrentPosition(function(position) {
  
        // Set the value of the location field to the user's current position
        var locationField = $('#id_location');
        locationField.val(position.coords.latitude + ',' + position.coords.longitude);
  
      });
  
    }
  
  });
  