require.config({
  baseUrl: 'app',
  paths: {
    jquery: 'bower_components/jquery/dist/jquery',
    underscore: 'bower_components/underscore/underscore',
    backbone: 'bower_components/backbone/backbone',
    foundation: 'bower_components/foundation/js/foundation',
    offCanvas: 'bower_components/foundation/js/foundation/foundation.offcanvas',
    text: 'js/libs/require/text'
  },
  shim: {
    'foundation': {
      deps: ['jquery'],
      exports: 'foundation'
    }
  }
});

require(['js/views/app', 'foundation', 'offCanvas'], function(AppView){
  console.log($);
  var app_view = new AppView;
  $(document).foundation();
  setInterval(function(){
    app_view.fetchNew();
  }, 180000);
});
