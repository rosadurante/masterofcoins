require.config({

    paths: {
        'domReady': './libs/domReady/domReady',
        'underscore': './libs/underscore/underscore',
    },

    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(['app']);