define([
  'jquery',
  'underscore',
  'backbone',
  'js/models/station'
  ], function($, _, Backbone, Station){
  var Stations = Backbone.Collection.extend({
    url: "http://bike-share-api.herokuapp.com/api/stations",

    model: Station,

    parse: function(response) {
      return response;
    },

    filterLocations: function(filter){
      return _.filter(this.models, function(station){
        return station.isInArea(filter);
      });
    }

  });
  return Stations;
});
