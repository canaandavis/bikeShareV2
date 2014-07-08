require.config({
  paths: {
    jquery: 'bower_components/jquery/dist/jquery',
    underscore: 'bower_components/underscore/underscore',
    backbone: 'bower_components/backbone/backbone',
    text: 'js/libs/require/text'
  }
});

require(['js/views/app'], function(AppView){
  var app_view = new AppView;
  setInterval(function(){
    app_view.fetchNew();
  }, 180000);
});
