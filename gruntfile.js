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

        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['src/js/libs/**/*.js']
            },
            all: ['gruntfile.js', 'src/js/**/*.js']
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src/',
                    mainConfigFile: 'src/js/config.js',
                    out: 'src/js/app.js'
                }
            }
        },

        jasmine: {
            src: 'src/js/**/*.js',
            options: {
                specs: 'src/js/**/*Spec.js',
                vendor: 'src/js/libs/**/*.js'
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('watch', 'Watching Sass', [
        'sass:dev', 'watch'
    ]);

    grunt.registerTask('dev', 'Compile and open', [
        'sass:dev', 'jshint', 'jasmine', 'connect:dev'
    ]);

    grunt.registerTask('prod', 'Compile and run server', [
        'sass:prod', 'connect:server'
    ]);
};