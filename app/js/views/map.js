define([
  'jquery',
  'underscore',
  'backbone',
  'js/collections/stations'
  ], function($, _, Backbone, Stations){
    var MapView = Backbone.View.extend({

      // Renders Map view, using MapBox

      render: function(){
        var mq = window.matchMedia('(max-width: 768px)');
        if (mq.matches) {
          this.map = L.mapbox.map('map', 'canaandavis.im7gj1kg', {
              zoomControl: false
            })
            .setView([30.27, -97.744], 14);
        } else {
          this.map = L.mapbox.map('map', 'canaandavis.im7gj1kg', {
              zoomControl: true
            })
            .setView([30.27, -97.744], 14);
        }

        var myLayer = L.mapbox.featureLayer().addTo(this.map);

        var builtFeatures = this.buildPoints();

        var geojson = {
          type: 'FeatureCollection',
          features: builtFeatures
        };

        myLayer.setGeoJSON(geojson);

        myLayer.eachLayer(function(layer) {
          // Builds popups for Points on Map
          var content = '<h2>'+ layer.feature.properties.title + '<\/h2>' +
              '<p><strong>Free Bikes:</strong> ' + layer.feature.properties.free + '<br \/>' +
              '<strong>Return Slots:</strong> ' + layer.feature.properties.empty + '<br \/>' +
              '<strong>Address:</strong><a target="new" href="http://maps.google.com/maps?q=' + layer.feature.properties.latitude + ',' + layer.feature.properties.longitude + '"> ' +
                  layer.feature.properties.address +
                '</a><\/p>';
          layer.bindPopup(content);
        });
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
          var stationTemp = station.attributes;
          var address = that.parseAddress(stationTemp.extra.address);
          return {
            type: "Feature",
            properties: {
              'title' : stationTemp.name,
              'free'  : stationTemp.free_bikes,
              'empty' : stationTemp.empty_slots,
              'latitude' : stationTemp.latitude,
              'longitude' : stationTemp.longitude,
              'address' : address,
              'marker-color': '#000',
              'marker-size': 'medium',
              'marker-symbol': 'bicycle',
            },
            geometry: {
              type: 'Point',
              coordinates: [stationTemp.longitude, stationTemp.latitude]
            }
          };
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
