define([
  'jquery',
  'underscore',
  'backbone',
  'js/models/station'
  ], function($, _, Backbone, Station){
  var Stations = Backbone.Collection.extend({
    url: "http://api.citybik.es/v2/networks/austin?fields=stations",

    model: Station,

    parse: function(response) {
      return response.network.stations;
    },

    filterLocations: function(filter){
      return _.filter(this.models, function(station){
        return station.isInArea(filter);
      });
    }

  });
  return Stations;
});
