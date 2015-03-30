define(['hbs!views/experience'], function (experienceTpl) {

  var Experience = function() {
    document.querySelector('.content').innerHTML = experienceTpl();
    console.log('Experience page!');
  };

  return Experience;
});
