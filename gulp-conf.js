var conf = {
  paths: {
    app: 'app',
    dist: 'app/dist',
    scripts: 'app/scripts',
    styles: 'app/styles',
    css: 'app/styles/css',
    sass: 'app/styles/scss',
    images: 'app/img',
    fonts: 'app/fonts'
  },
  stylesFormat: '.scss',
  compassConf: {
    usesCompass: false,
    configRbPath: 'path/to/config.rb'
  },
  styles: {
    lib: {
      prefix: 'app/bower_components/',
      files: [
        'normalize.css/normalize.css'
      ]
    },
    custom: {
      prefix: 'app/styles/',
      files: [
        'scss/main.scss'
      ]
    }
  }
};

module.exports = conf;
