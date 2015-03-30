# AMD boilerplate

### Description

Full dev & prod boilerplate for AMD projects using [Gulp](http://gulpjs.com/), [r.js](http://requirejs.org/docs/optimization.html) and SCSS.  

The `app` folder contains the full AMD application, using [RequireJS](http://requirejs.org), [Exoskeleton](http://exojs.com), which is a dependency-free [Backbone](http://backbonejs.org) fork, [Handlebars](http://handlebars.org) for the templating and several tiny backbone plugins for native jQuery-like selectors and ajax requests.  

Thus, the total dependencies weight is ~75kb instead of ~180kb, removing the complete jQuery and Underscore Backbone's usual dependencies.  

### Full app content list

The app uses the following dependencies:  

- [RequireJS](https://github.com/jrburke/requirejs)  
- [Exoskeleton](https://github.com/paulmillr/exoskeleton) (dependency-free Backbone)  
- [Handlebars](https://github.com/wycats/handlebars.js/) (template engine)  
- [RequireJS Handlebars](https://github.com/epeli/requirejs-hbs) (Handlebars easy require integration)  
- [jBone](https://github.com/kupriyanenko/jbone) (tiny jQuery-like DOM library, use `Backbone.$(...)`)  
- [Backbone NativeView](https://github.com/akre54/Backbone.NativeView) (native JS Backbone Views implementation)  
- [Backbone NativeAjax](https://github.com/akre54/Backbone.NativeAjax) (native jQuery-like ajax implementation, use `Backbone.ajax(...)`)  

### Usage

Before starting everything, please check that you have:  
- NodeJS installed, obviously...  
- Gulp installed: `$ sudo npm install -g gulp`  
- r.js installed: `$ sudo npm install -g requirejs`  

Then, simply run those two lines to grab the external dependencies:  
- `$ npm install`  
- `$ bower install`  

__Now__, this boilerplate comes with a complete assets pipeline that allows you to do two main tasks:  

- `$ gulp serve` For a live server watching all your SCSS, JS and index.html files using [Browsersync](http://www.browsersync.io/), so that you can code and automatically preview IRL countless devices/browsers using the dev URL given in the console.  
- `$ npm run build` To build the app for a fully-effective and optimized prod version of your app. It will take a couple of seconds to build it up in the `app/dist` folder. It will use the  r.js optimizer to build your app with only two JS files (the app itself and its dependencies), concat, minify all the JS code; then run a Gulp build task to add a revision hash to the freshly built JS app, and do the same for the SCSS files (compile, concat, optimize, uglify and revision); and finally build an optimized prod-ready HTML taking care of those new files and the dist app's new architecture.  

__Be careful__, once built, the `dist` app probaby won't work in a local environment as the html `base` meta points to the root of the prod server, and you might have set the proper app's root url in the `app/scripts/classes/conf.js` file.  

### Configuration

The Gulp tasks can be configured in the `gulp-conf.js` file. Thus, you'll be able to chose the app's paths, as well as the stylesheets' order. Indeed, you can chose which vendor and custom css/scss files you need and the order in which they will be concatenated.  

If you want to further the Gulp pipeline and the r.js build, take a look at the `gulpfile.js` and the `app/build.js` files.  

### About

I'm [Pierre Guilhou](http://pierreguilhou.me), a french full-stack developer in love with the Internet and its countless possibilities. Feel free to stay in touch here:  
- [LinkedIn](https://www.linkedin.com/in/pierreguilhou)  
- [Angel List](https://angel.co/pierre-guilhou)
