define([
  'jquery',
  'underscore',
  'backbone',
  'js/collections/stations',
  'js/views/station',
  'js/views/map'
  ], function($, _, Backbone, Stations, StationView, MapView){
    var AppView = Backbone.View.extend({

      el: $('.wrapper'),

      events: {
        'click .filter' : 'setFilter',
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

      setFilter: function(filter) {
        var filterTemp = $(filter.target).attr('value');
        this.filter = filterTemp;
        this.addFilter();
      },

      addFilter: function() {
        this.filterLocations(this.filter);
      },

      filterLocations: function(filter){
        var stations = this.collection.filterLocations(filter);
        this.updateLocationList(stations);
        this.updateMap(stations);
      },

      buildMap: function(collection) {
        this.map = new MapView({ collection : collection.models });
        this.map.render();

        // $('#map').append(this.map.render().el);
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
        this.filterLocations(this.filter);
      },

      changeView: function(view){
        var viewTemp = $(view.target).attr('value');
        var hide = "map";
        if (viewTemp === "map") {
          $("#stations-wrapper").addClass("show-for-large-up");
          $('#map').removeClass('show-for-large-up');
          this.addFilter();
        } else {
          $("#stations-wrapper").removeClass("show-for-large-up");
          $('#map').addClass('show-for-large-up');
        }
      }

    });
    return AppView;
  });
