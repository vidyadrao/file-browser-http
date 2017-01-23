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
    grunt.initConfig({
        less: {
            source: {
                // files : {"src/static/css/index.css" : "src/static/css/index.less"}
                src: ["src/static/css/*.less"],
                dest: "src/static/css/",
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
                tasks: ["clean:less", "less:source"]
            },
            server: {
                files: ["src/**/*.js"],
                tasks: ["start-server"],
                 options: {                  
                  interrupt: true
                }
            }                
        }, 
        browserify: {
            js: {
                src: ['src/routes/home/common/*.js'],
                ext: '.browserify.js',
                extDot: 'last',
                expand: true
                
                
            }
        },
        eslint: {
            target: ['Gruntfile.js', 'src/**/*.js', '!src/static/**/*.js']
        },
        'docco-plus': {
          debug: {
            src: ['src/**/*.js'],
            options: {
              output: 'docs/'
            }
          }
        }
    });
    grunt.registerTask('start-server', function() {
        let done = this.async();
        if(serverProcess){
            serverProcess.kill();
        }
        serverProcess = spawn('node', ['src/server.js']);
        serverProcess.stdout.on('data', data => {
            process.stdout.write(data);
        });
        serverProcess.stderr.on('data', data => {
            process.stderr.write(data);
        }); 
    
        serverProcess.on('error', (err) => {
                         console.log(err);
                         });
        
    });
    grunt.registerTask('build', ['clean', 'less']);
};
