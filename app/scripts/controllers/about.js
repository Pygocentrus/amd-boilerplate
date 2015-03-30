define(['hbs!views/about'], function (aboutTpl) {

  var About = function() {
    document.querySelector('.content').innerHTML = aboutTpl();
    console.log('About page!');
  };

  return About;
});
