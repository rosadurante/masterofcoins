/* globals module */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            prod: {
                options: { style: 'compressed' },
                files: { 'src/css/styles.css': 'src/scss/styles.scss' }
            },
            dev: {
                files: { 'src/css/styles.css': 'src/scss/styles.scss' }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: process.env.PORT || 5000,
                    base: 'src',
                    keepalive: true,
                }
            },
            dev: {
                options: {
                    port: 8000,
                    base: 'src',
                    keepalive: true,
                    open: 'http://localhost:8000'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('dev', 'Compile and open', [
        'sass:dev', 'connect:dev'
    ]);

    grunt.registerTask('prod', 'Compile and run server', [
        'sass:prod', 'connect:server'
    ]);
};