var heatMapData;

function get(cb) {
  var xhr=new XMLHttpRequest();
  xhr.addEventListener('load', function() {
    cb(null, this.response);
  });
  xhr.addEventListener('error', function(event) {
    alert('error');
    cb('Unknown error.');
  });
  xhr.open('GET', 'http://emotional-cartography.herokuapp.com/api');
  xhr.timeout=6000;
  xhr.ontimeout=function() {
    cb("The request timed out. Please try again later!");
  };
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send();
}

get(function(err, res) {
  var arr;
  if (err) {
    console.log(err);
  } else {
    arr=JSON.parse(res);
    heatMapData=arr.map(function(obj) {
      return {
        location: new google.maps.LatLng(obj.location.lat, obj.location.long),
        weight: Math.random()*100
      };
    });
    initialize();
  }
});
