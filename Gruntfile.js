module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     preserveComments: false,
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'build/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      minify: {
        src: 'src/css/<%= pkg.name %>.css',
        dest: 'build/<%= pkg.name %>.min.css'
      }
    },
    // concat: {
    //   options: {
    //     stripBanners: true,
    //     banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
    //       '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
    //   },
    //   dist: {
    //     src: ['src/js/config.js', 'src/js/model.js', 'src/js/collection.js', 'src/js/SSNumbers.js'],
    //     dest: 'build/SSNumbers.js',
    //   }
    // },
    requirejs: {
      compile: {
        options: {
          baseUrl: ".",
          mainConfigFile: "src/js/config.js",
          name: "src/js/SSNumbers.js",
          out: "build/SSNumbers.js"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['cssmin', 'requirejs']);

};