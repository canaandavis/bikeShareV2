define([
  'jquery',
  'underscore',
  'backbone',
  'foundation',
  'offCanvas',
  'js/collections/stations',
  'js/views/station',
  'js/views/map'
  ], function($, _, Backbone, Foundation, OffCanvas, Stations, StationView, MapView){
    var AppView = Backbone.View.extend({

      el: $('.wrapper'),

      events: {
        'click .filter' : 'addFilter',
        'click .view-select' : 'changeView'
      },

      initialize: function(){
        this.that = this;
        this.collection = new Stations();
        this.collection.bind('reset', this.buildMap, this);
        this.collection.bind('reset', this.addAllStations, this);
        this.collection.bind('filtered', this.showOne, this);
        this.filter = "all";
        this.listenTo(this.collection, 'change', this.updateStations);
        this.collection.fetch({reset: true});
      },

      addOne: function(station) {
        var view = new StationView({ model: station });
        $('#stations').append(view.render().el);
      },

      addAllStations: function(){
        this.collection.each(this.addOne);
      },

      addFilter: function(filter) {
        var filter = $(filter.target).attr('value');
        this.filter = filter;
        this.filterLocations(filter);
      },

      filterLocations: function(filter){
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
        this.map.updateMap(stations);
      },

      fetchNew: function(){
        console.log(this.collection);
        this.collection.fetch();
      },

      updateStations: function(model){
        console.log(change)
        this.filterLocations(this.filter);
      },

      changeView: function(view){
        var view = $(view.target).attr('value');
        var hide = "map";
        if (view === "map") {
          $("#stations").addClass("show-for-large-up");
        } else {
          $("#stations").removeClass("show-for-large-up");
        }
      }

    });
    return AppView;
  });
