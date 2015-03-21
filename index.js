var map, heatmap;

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(51.510888, -0.117935),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ];

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });

  heatmap.setMap(map);
  heatmap.set('gradient', gradient);
  heatmap.set('radius', 40);
  heatmap.set('opacity', 0.5);
}
