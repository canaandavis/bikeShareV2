define([
  'jquery',
  'underscore',
  'backbone',
  'js/models/station',
  'text!js/templates/list.html'
  ], function($, _, Backbone, Station, listTemplate){
    var StationView = Backbone.View.extend({

      initialize: function(){
        this.model.bind('filter', this.showIt, this)
      },

      model: Station,
      template: _.template(listTemplate),

      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      },

      showIt: function(){
        this.model.trigger('filtered', [this]);
      },

      parseName: function(name) {
        return name.substring(0, name.length - 9);
      },

      showInfo: function() {
        console.log('hello');
      }
  });
    return StationView;
});
