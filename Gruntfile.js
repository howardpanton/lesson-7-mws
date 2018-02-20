/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [
          {
            name: "small",
            width: 640,
            quality: 80,
          },
          {
            name: "medium",
            width: 1024,
            quality: 80,
          },
          {
            name: "large",
            width: 1600,
            quality: 70,
          },
        ]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: './src/images_src/',
          dest: './public/images/'
        }]
      }
    },

    /* Minify CSS file */
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: './src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'public/css',
          ext: '.min.css'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['public/**'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['public']
        },
      },
    },


    /* Gzip html file */
    gzip: {
      options: { detail: true},
      index: {
        src: [
          'public/index.html',
        ]
      }
    },


    /* Watch CSS files for changes */
    watch: {
      css: {
        files: './src/**/*.css',
        tasks: ['cssmin'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: './src/*.html',
        tasks: ['copy:gzip'],
        options: {
          livereload: true,
        },
      },
    },


    /* Copy the "fixed" images that don't go through processing into the
    images/directory */
    copy: {
      dev: {
        files: [{
          cwd: './images_src/fixed',
          expand: true,
          src: '*.{gif,jpg,png}',
          dest: 'public/images/'
        }]
      },
      gzip: {
        files: [{
          cwd: './src',
          expand: true,
          src: 'index.html',
          dest: 'public/'
        }]
      },
    },
  });


  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-gzip');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', [
    'clean',
    'mkdir',
    'copy',
    'responsive_images',
    'cssmin',
    'gzip',
    'watch',
  ]);
};
