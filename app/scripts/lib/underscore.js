/*
 * Makes Exoskeleton r.js optimization work
 * as it requires it as a hard dependency,
 * so we keep it, empty.
 */
define('underscore', ['backbone'], function(Backbone){
  return Backbone.utils;
});
