define([
  'text!projects.json',
  'hbs!views/project',
  'hbs!views/404'
], function (projects, projectTpl, unknownTpl) {

  var Project = function(project) {
    /* We parse the projects only once, right after we loaded them */
    projects = typeof projects === 'object'
      ? projects
      : JSON.parse(projects).elements;

    /* We check whether the project exists */
    var current = projects.filter(function(el) {
      return el.slug === project;
    });

    if (current && current[0]) {
      document.querySelector('.content').innerHTML = projectTpl(current[0]);
    } else {
      /* Return a 404 if we didn't find a matching project */
      document.querySelector('.content').innerHTML = unknownTpl();
    }

    console.log('Project page!', project);
  };

  return Project;
});
