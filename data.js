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

function calcWeight(positivity, hbpm) {
  var weight=500,
      pos=positivity,
      h=hbpm;
  console.log(pos);
  console.log(h);

  if (pos) {
    if (pos < 0) {
      // sad -> weight UP
      weight *= Math.abs(pos) * 40;
    } else {
      weight *= 1/pos;
    }
  }
  if (h) {
    if (h > 80) {
      // stressed -> weight UP
      weight += h-80;
    } else {
      weight -= 80-h;
    }
  }

  return weight;
}

get(function(err, res) {
  var arr;

  if (err) {
    console.log(err);
  } else {
    arr=JSON.parse(res);
    heatMapData=arr.filter(function(obj) {
      var hasProps = obj.location && obj.location.lat,
          isntHBPM0 = true,
          hasMood = obj.positivity;
      if (obj.hbpm && obj.hbpm === 0) {
        isntHBPM0 = false;
      }
      return hasProps && isntHBPM0 && hasMood;
    }).map(function(obj) {
      return {
        location: new google.maps.LatLng(obj.location.lat, obj.location.long),
        // weight: calcWeight((Math.random()*2)-1, (Math.random()*60)+60)
        weight: calcWeight(obj.positivity, obj.hbpm)
      };
    });
    console.log(heatMapData.length);
    console.log(heatMapData[5],heatMapData[10],heatMapData[15]);
    console.log(heatMapData.map(function(o) {return Math.round(o.weight);}));
    initialize();
  }
});
