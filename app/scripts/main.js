require.config({
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: '../bower_components/exoskeleton/exoskeleton',
    'backbone.nativeview': '../bower_components/backbone.nativeview/backbone.nativeview',
    'backbone.nativeajax': '../bower_components/backbone.nativeajax/backbone.nativeajax',
    jbone: '../bower_components/jbone/dist/jbone',
    handlebars: '../bower_components/requirejs-hbs/example/assets/lib/handlebars',
    'handlebars-compiler': '../bower_components/requirejs-hbs/example/assets/lib/handlebars-runtime',
    text: '../bower_components/requirejs-text/text'
  },

  shim: {
    backbone: {
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    }
  },

  packages: [{
      name: 'hbs',
      location: '../bower_components/requirejs-hbs',
      main: 'hbs'
    }
  ]
});

require(['infrastructure'], function() {
  require(['router'], function(Router) {
    Router.init();
  });
});
