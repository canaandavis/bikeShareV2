define([
  'jquery',
  'underscore',
  'backbone',
  'js/models/station',
  ], function($, _, Backbone, Station, AppView){
    var StationView = Backbone.View.extend({
      initialize: function(){
        this.model.bind('filter', this.showIt, this)
      },

      model: Station,
      template: _.template("<div><%= name %></div><div>Free Bikes: <%= free_bikes %>"),

      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      },

      showIt: function(){
        this.model.trigger('filtered', [this]);
      }
  });
    return StationView;
});
