define(['hbs!views/skills'], function (skillsTpl) {

  var Skills = function() {
    document.querySelector('.content').innerHTML = skillsTpl();
    console.log('Skills page!');
  };

  return Skills;
});
