define(['hbs!views/contact'], function (contactTpl) {

  var Contact = function() {
    document.querySelector('.content').innerHTML = contactTpl();
    console.log('Contact page!');
  };

  return Contact;
});
