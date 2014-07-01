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
                ignores: ['src/js/libs/**/*.js', 'src/js/build/**/*.js']
            },
            all: ['gruntfile.js', 'src/js/**/*.js']
        },

        requirejs: {
            compile: {
                options: {
                    name: 'app',
                    baseUrl: 'src/js',
                    mainConfigFile: 'src/js/config.js',
                    optimize: 'uglify2',
                    out: 'src/js/app.js'
                }
            }
        },

        jasmine: {
            src: ['src/js/app.js', 'src/js/changeMachine.js'],
            options: {
                specs: 'src/js/specs/*Spec.js',
                vendor: ['src/js/libs/requirejs/require.js',
                         'src/js/specs/config.js',
                         'src/js/specs/libs/mockDomReady.js',
                         'src/js/libs/underscore/underscore.js'],
                outfile: 'src/js/specs/specRunner.html',
                keepRunner: true,
                template: 'custom.tmpl'
            }
        },

        shell: {
            installDependencies: {
                command: [
                    'cd src/js',
                    'bower install'
                ].join(' && ')
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
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('watch', 'Watching Sass', [
        'sass:dev', 'watch'
    ]);

    grunt.registerTask('dev', 'Compile and open', [
        'sass:dev', 'jshint', 'connect:dev'
    ]);

    grunt.registerTask('prod', 'Compile and run server', [
        'shell', 'connect:server'
    ]);
};