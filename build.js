({
    appDir: './',
    baseUrl: './app',
    dir: './dist',
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        // Backbone Dependencies
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/lodash/dist/lodash.underscore',
        backbone: 'bower_components/backbone/backbone',

        // Foundation dependencies
        modernizr: 'bower_components/modernizr/modernizr',
        'foundation.core': 'bower_components/foundation/js/foundation',
        'foundation.offcanvas': 'bower_components/foundation/js/foundation/foundation.offcanvas',

        // Require.js Text
        text: 'js/libs/require/text'
      },
      shim: {
        'foundation.core': {
          deps: ['jquery'],
          exports: 'Foundation'
        },
        'foundation.offcanvas': {
          deps: ['foundation.core']
        }
      }
})
