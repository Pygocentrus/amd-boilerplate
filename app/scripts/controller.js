define([
  'controllers/home',
  'controllers/contact',
  'controllers/about',
  'controllers/skills',
  'controllers/experience',
  'controllers/project',
  'controllers/projects',
  'controllers/404'
], function (Home, Contact, About, Skills, Experience, Project, Projects, Unknown) {

  var Controller = {};

  Controller.home       = Home;
  Controller.contact    = Contact;
  Controller.about      = About;
  Controller.skills     = Skills;
  Controller.experience = Experience;
  Controller.project    = Project;
  Controller.projects   = Projects;
  Controller.unknown    = Unknown;

  return Controller;
});
