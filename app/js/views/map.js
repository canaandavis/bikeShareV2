define([
  'jquery',
  'underscore',
  'backbone',
  'js/collections/stations'
  ], function($, _, Backbone, Stations){
    var MapView = Backbone.View.extend({

      // Renders Map view, using MapBox

      render: function(){
        this.map = L.mapbox.map('map', 'canaandavis.im7gj1kg')
                  .setView([30.27, -97.744], 14);
        var myLayer = L.mapbox.featureLayer().addTo(this.map);
        var myLayer = L.mapbox.featureLayer().addTo(this.map);

        var builtFeatures = this.buildPoints();

        var geojson = {
          type: 'FeatureCollection',
          features: builtFeatures
        }

        myLayer.setGeoJSON(geojson);

        myLayer.eachLayer(function(layer) {
          // Builds popups for Points on Map
          var content = '<h2>'+ layer.feature.properties.title + '<\/h2>' +
              '<p><strong>Free Bikes:</strong> ' + layer.feature.properties.free + '<br \/>' +
              '<strong>Return Slots:</strong> ' + layer.feature.properties.empty + '<br \/>' +
              '<strong>Address:</strong> ' + layer.feature.properties.address + '<\/p>';
          layer.bindPopup(content);
        });
        console.log(this.collection)
        return this;
      },

      // function to parse address response text

      parseAddress: function(address) {
        return address.substring(0, address.length - 9);
      },

      // Function to iterate over collection
      // And generate points on the map

      buildPoints: function(){
        var that = this;
        var stations = this.collection;
        var geoJson = _.map(stations, function(station){
          var station = station.attributes;
          var address = that.parseAddress(station.extra.address);
          return {
            type: "Feature",
            properties: {
              'title' : station.name,
              'free'  : station.free_bikes,
              'empty' : station.empty_slots,
              'address' : address,
              'marker-color': '#000',
              'marker-size': 'medium',
              'marker-symbol': 'bicycle',
            },
            geometry: {
              type: 'Point',
              coordinates: [station.longitude, station.latitude]
            }
          }
        });
        return geoJson;
      },

      // Function to clear the current map and
      // Create a new map with the stations passed

      updateMap: function(stations) {
        this.map.remove();
        this.collection = stations;
        this.render();
      }
  });
  return MapView;
});
