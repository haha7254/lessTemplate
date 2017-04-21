$(function(){
  var $maps = $('#maps');

  var _maps= null;

  google.maps.event.addDomListener(window, 'load', function(){
      var position = new google.maps.LatLng(35.690892, 139.698001);

      var myPosition = {
        Lat: 35.681029,
        Lng: 139.765307
      }
      _maps = new google.maps.Map($maps.get(0),{ zoom:16, disableDefaultUI: true, center: position });

      $('#zoom-in').click(function(){
          _maps.setZoom(_maps.zoom+1);
      });
      $('#zoom-out').click(function(){
          _maps.setZoom(_maps.zoom-1);
      });
      $('#location').click(function(){
          _maps.setCenter(new google.maps.LatLng(myPosition.Lat, myPosition.Lng));
      });
  });

});
