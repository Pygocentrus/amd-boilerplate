define([
  'text!projects.json',
  'hbs!views/projects'
], function (projects, projectsTpl) {

  var Projects = function() {
    /* We parse the projects only once, right after we loaded them */
    projects = typeof projects === 'object'
      ? projects
      : JSON.parse(projects).elements;

    console.log('Projects page!', projects);
    document.querySelector('.content').innerHTML = projectsTpl({ cases: projects });
  };

  return Projects;
});
