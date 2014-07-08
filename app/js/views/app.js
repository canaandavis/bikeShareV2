define([
  'jquery',
  'underscore',
  'backbone',
  'js/collections/stations',
  'js/views/station',
  'js/views/map'
  ], function($, _, Backbone, Stations, StationView, MapView){
    var AppView = Backbone.View.extend({

      el: $('.app-wrapper'),

      events: {
        'click .filter' : 'addFilter'
      },

      initialize: function(){
        this.that = this;
        this.collection = new Stations();
        this.collection.bind('reset', this.buildMap, this);
        this.collection.bind('reset', this.addAllStations, this);
        this.collection.bind('filtered', this.showOne, this);
        this.collection.fetch({ reset: true });
      },

      addOne: function(station) {
        var view = new StationView({ model: station });
        $('#stations').append(view.render().el);
      },

      addAllStations: function(){
        this.collection.each(this.addOne);
      },

      addFilter: function(filter) {
        var filter = $(filter.target).val();
        var stations = this.collection.filterLocations(filter);
        this.updateLocationList(stations);
        this.updateMap(stations);
      },

      buildMap: function(collection) {
        this.map = new MapView({ collection : collection.models });
        $('#map').append(this.map.render().el);
      },

      updateLocationList: function(stations) {
        var that = this;
        this.$('#stations').html('');
        _.each(stations, function(station){
          station.trigger('filter');
        });
      },

      showOne: function(view){
        $('#stations').append(view[0].el);
      },

      updateMap: function(stations) {
        this.$('#map').html('');
        this.map.updateMap(stations);
      },

    });
    return AppView;
  });
