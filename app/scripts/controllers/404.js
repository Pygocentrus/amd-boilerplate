define(['hbs!views/404'], function (unknownTpl) {

  var Unknown = function() {
    document.querySelector('.content').innerHTML = unknownTpl();
    console.log('Unknown page');
  };

  return Unknown;
});
