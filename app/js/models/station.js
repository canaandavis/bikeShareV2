define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone){
  var Station = Backbone.Model.extend({
    coordinates: {
      "downtown" : {
        north: 30.277638,
        south: 30.260236,
        east: -97.736533,
        west: -97.755952
      },

      "south" : {
        north: 30.266617,
        south: 30.240840,
        east: -97.745281,
        west:  -97.783862
      },

      "east" : {
        north: 30.280478,
        south: 30.247396,
        east: -97.699200,
        west: -97.734440
      },

      "campus" : {
        south: 30.277638,
        west: -97.752770,
        north: 30.296389,
        east: -97.728051
      }

    },

    isInArea: function(value){
      if (value === "all") return true;

      var coordinates = this.coordinates[value];

      if (this.attributes.latitude >= coordinates.south && this.attributes.latitude <= coordinates.north && this.attributes.longitude <= coordinates.east && this.attributes.longitude >= coordinates.west) {
        return true;
      }
      else {
        return false;
      }
    },


  });
  return Station;
});
