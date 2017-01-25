"use strict";
const spawn = require('child_process').spawn;
let serverProcess = null;
module.exports = grunt => {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-docco-plus');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.initConfig(
        {
            less: {
                source: {
                    // files : {"src/static/css/index.css" : "src/static/css/index.less"}
                    src: "src/static/css/*.less",
                    ext: ".css",
                    extDot: 'last',
                    expand: true

                }
            },
            clean: {
                less: ["src/static/css/*.css"]

            },
            watch: {
                less: {
                    files: ["<%=less.source.src%>"],
                    tasks: [
                        "clean:less",
                        "less:source"
                    ]
                },
                browserify: {
                    files: ["<%=browserify.js.src%>"],
                    tasks: ["browserify:js"]
                }
            },
            browserify: {
                options: {
                    transform: ['pugify']
                },
                js: {
                    src: ['src/routes/home/browser/*.js'],
                    dest: 'src/static/scripts/',
                    ext: '.browserify.js',
                    extDot: 'last',
                    expand: true,
                    flatten: true
                }
            },
            eslint: {
                target: [
                    'Gruntfile.js',
                    'src/**/*.js',
                    '!src/static/**/*.js'
                ]
            },
            'docco-plus': {
                debug: {
                    src: ['src/**/*.js'],
                    options: {
                        output: 'docs/'
                    }
                }
            }
        }
    );
    grunt.registerTask(
        'build',
        [
            'clean',
            'less',
            'browserify'
        ]
    );
    grunt.registerTask('start-server');
};
