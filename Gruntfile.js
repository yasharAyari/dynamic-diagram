module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
  var timer = require("grunt-timer");
  timer.init(grunt);

  grunt.initConfig({
    //load 'package.json'file
    pkg: grunt.file.readJSON('package.json'),
    // compile sass files into css
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
            'src/css/dynamicDiagram-rtl.css': 'src/sass/dynamicDiagram-rtl.scss',
            'src/css/dynamicDiagram-ltr.css': 'src/sass/dynamicDiagram-ltr.scss'
        }
      }
    },
    // create suitable prefix for all browsers
    autoprefixer: {
      options: {
        browsers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']
      },
      dist:{
        files:{
          'src/css/dynamicDiagram-rtl.css':'src/css/dynamicDiagram-rtl.css',
          'src/css/dynamicDiagram-ltr.css':'src/css/dynamicDiagram-ltr.css'
        }
      }
    },
    // build node js server
    connect: {
      target: {
        options: {
          port: 9001,
          open: true,
          livereload: 35729,
          hostname: '0.0.0.0',
          middleware : function (connect) {
            return [
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ).use(
                '/src',
                connect.static('./src')
              ),
              connect.static('./example')
              ]
          }
        }
      }
    },
    // watch files for changes and do proper action
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['src/js/{,*/}*.js'],
        tasks: ['jshint:serve'],
        options: {
          livereload: '<%= connect.target.options.livereload %>'
        }
      },
      sass: {
        files: ['src/sass/{,*/}*.{scss,sass}'],
        tasks: ['sass','autoprefixer'],
        options: {
          livereload: '<%= connect.target.options.livereload %>'
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.target.options.livereload %>'
        },
        files: [
          'example/**/*.html',
          'example/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      options: {
        livereload: true
      }
    },
    // minfy css and javascript files
    useminPrepare: {
      html: 'example/index.html'
    },
    // replace all javascript and css files with minfy one in html
    usemin: {
      html: ["dist/index.html", "dist/login.html","dist/company.html"]
    },
    // copy necessary files to dist folder
    copy: {
      build: {
        files:[
          {src: 'app/index.html',dest: 'dist/index.html'},
          {src: 'app/login.html',dest: 'dist/login.html'},
          {src: 'app/company.html',dest: 'dist/company.html'},
          {
            cwd: 'app/fonts',  // set working folder / root to copy
            src: '**/*',           // copy all files and subfolders
            dest: 'dist/fonts',    // destination folder
            expand: true           // required when using cwd
          },
          {
            cwd: 'app/images',  // set working folder / root to copy
            src: '**/*',           // copy all files and subfolders
            dest: 'dist/images',    // destination folder
            expand: true           // required when using cwd
          },
          {
            cwd: 'app/js',  // set working folder / root to copy
            src: '**/*',           // copy all files and subfolders
            dest: 'dist/js',    // destination folder
            expand: true           // required when using cwd
          }
        ]
      },
      css: {
        files:[
          {src: 'src/css/dynamicDiagram-rtl.css',dest: 'dist/css/dynamicDiagram-rtl.css'},
          {src: 'src/css/dynamicDiagram-ltr.css',dest: 'dist/css/dynamicDiagram-ltr.css'}
        ]
      },
      develop: {
        files:[
          {
            cwd: 'bower_components/bootstrap-sass-rtl/dist/fonts',  // set working folder / root to copy
            src: '**/*',           // copy all files and subfolders
            dest: 'app/fonts',    // destination folder
            expand: true           // required when using cwd
          }
        ]
      }
    },
    // clean unwanted folders
    clean: {
      build: {
        src: ["dist/*",'.tmp/*']
      }
    },
    // validate all javascript files by jshint
    jshint: {
      serve: {
        options: {
        },
        src: ['src/js/**/*.js','!scr/js/vendor/**',],
      },
    },
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/js',
          src: '*.js',
          dest: '.tmp/concat/js'
        }]
      }
    },
  });


  grunt.registerTask('build:server',[
    'sass',
    'autoprefixer',
    'jshint:serve'
  ]);

  grunt.registerTask('serve', ['build:server','connect:target','watch']);
}
