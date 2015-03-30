define([
  'backbone',
  'classes/config',
  'controller'
], function (Backbone, Config, Controller) {

  var AppRouter = function() {};

  AppRouter.init = function() {

    /* Handle each request allowed in the app */
    var Router = Backbone.Router.extend({
      routes: {
        "": "home",
        "home": "home",
        "about": "about",
        "skills": "skills",
        "experience": "experience",
        "contact": "contact",
        "projects": "projects",
        "project/:name": "project",
        "*actions": "defaultRoute"
      },
      initialize: function () {
        this.route(/^project\/(\w+)/, 'project');
      },
      home: Controller.home,
      about: Controller.about,
      contact: Controller.contact,
      skills: Controller.skills,
      experience: Controller.experience,
      projects: Controller.projects,
      project: Controller.project,
      defaultRoute: Controller.unknown
    });

    var router = new Router();

    /* Native live click */
    function live(eventType, cb) {
      document.addEventListener(eventType, function (event) {
        /* If it's a link */
        if (event.target.tagName === 'A') {
          if (typeof event.target.classList[0] !== 'string') {
            /* If it doesn't have any class, we navigate */
            cb.call(event.target, event);
          } else if (!event.target.classList[0].match(/^external/)) {
            /* If it has classes, we check if it's not an external link */
            cb.call(event.target, event);
          }
        }
      });
    }

    /* For each internal link in the page, we handle its navigation */
    live("click", function (event) {
      event.preventDefault();
      router.navigate(this.getAttribute('href'), { trigger: true });
    });

    /*
     * Start html5 urls to prevent hash
     * i.e http://url.com/page instead of http://url/#page
     */
    if (!Backbone.History.started) {
      Backbone.history.start({ pushState: true, root: Config.base });
    }
  };

  return AppRouter;
});
