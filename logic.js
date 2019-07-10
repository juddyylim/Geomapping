// Earthquake data from the past day 
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Creating map object
var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 6
});
  
// Adding tile layer to the map
var map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(myMap);

// Get data from url
d3.json(url).then(function(data) {
  console.log(data);
    
    // Add size and color earthquakes based on magnitude
    function style(feature) {
      return {
        fillColor: pickColor(feature.properties.mag),
        weight: 0.5,
        color: "black",
        fillOpacity: 0.9,
        radius: 4 * (feature.properties.mag)
      };
    }

    // Based on magnitude, determine color 
    function pickColor(magnitude) {
        if (mag > 5) { 
            return "#ea2c2c";
        }
        else if (mag > 4) {
            return "#ea822c";
        }
        else if (mag > 3) { 
            return "#ee9c00"; 
        }
        else if (mag > 2) { 
            return "#eecc00"; 
        }
        else if (mag > 1) { 
            return "#d4ee00"; 
        }
        else { 
            return "#98ee00"; 
        }
    };

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
          console.log(latlng);
          return L.circleMarker(latlng);
        },
        style: style(),
        onEachFeature: function (feature, layer) {
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(myMap); 

    var legend = L.control({ 
        position: "bottomright" 
    });

    // legend.onAdd = function(myMap) {

    //   var div = L.DomUtil.create("div", "info legend");
    //   var mag = [0, 1, 2, 3, 4, 5];
    //   var colors = ["#98ee00","#d4ee00", "#eecc00","#ee9c00","#ea822c", "#ea2c2c"];
    //   var labels = [];
      
    //   div.innerHTML = "<h3>Magnitude</h3>";

    //   mag.forEach(function (mag, index) {
    //     labels.push(`<tr><td class="legend-color" style="background-color: ${colors[index]}"></td><td>${mag}</td></tr>`);
    //   });
    //     div.innerHTML += 
    //     "<table>" + labels.join("") + "</table>";
        
    //   return div;
    // };

    // Add legend to the map
    // legend.addTo(myMap);
    
});