define([
  'jquery',
  'underscore',
  'backbone',
  'js/models/station'
  ], function($, _, Backbone, Station){
    var StationView = Backbone.View.extend({
      model: Station,
      template: _.template("<div><%= name %></div><div>Free Bikes: <%= free_bikes %>"),

      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      }
  });
    return StationView;
});
