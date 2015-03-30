define([
  "backbone",
  "backbone.nativeview",
  "backbone.nativeajax",
  "jbone",
  "handlebars",
  "text"
], function(Backbone, NativeView, NativeAjax, jbone, Handlebars, text) {
  Backbone.View = NativeView;
  Backbone.ajax = NativeAjax;
  Backbone.$ = jbone;
});
