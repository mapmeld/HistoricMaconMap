var map, footprint;

$(document).ready(function(){
  // make a Leaflet map
  map = new L.Map('map', { zoomControl: false, panControl: false });
  map.attributionControl.setPrefix('');
  L.control.pan().addTo(map);
  L.control.zoom().addTo(map);
  var toner = 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png';
  var tonerAttrib = 'Map data &copy; 2012 OpenStreetMap contributors, Tiles &copy; 2012 Stamen Design';
//var toner = 'http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg';
//var tonerAttrib = 'Map data &copy; 2012 OpenStreetMap contributors, Tiles by MapQuest';

  terrainLayer = new L.TileLayer(toner, {maxZoom: 18, attribution: tonerAttrib});
  map.addLayer(terrainLayer);
  map.setView(new L.LatLng(41.888476, -87.624034), 14);
  
  // add a sample neighborhood area and make it editable
  var wll = [ new L.LatLng(41.89084105056772, -87.6295280456543), new L.LatLng(41.884476, -87.624034), new L.LatLng(41.89084105056772, -87.61648178100586) ];
  footprint = new L.Polygon( wll, { color: "#00f", fillOpacity: 0.3, opacity: 0.65 } );
  footprint.editing.enable();
  map.addLayer(footprint);

});

function llserial(latlngs){
  var llstr = [ ];
  for(var i=0;i<latlngs.length;i++){
    llstr.push(latlngs[i].lat.toFixed(6) + "," + latlngs[i].lng.toFixed(6));
  }
  return llstr.join("|");
}

function postGeo(format){
  var poly = llserial(footprint.getLatLngs());
  $.post("/customgeo", { pts: poly }, function(data){
    if(format == "html"){
      window.location = "/timeline?customgeo=" + data.id;
    }
    else if(format == "geojson"){
      window.location = "/timeline-at.geojson?customgeo=" + data.id;
    }
    else if(format == "kml"){
      window.location = "/timeline-at.kml?customgeo=" + data.id;
    }
  });
}