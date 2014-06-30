require.config({

    paths: {
        domReady: 'libs/mockDomReady',
        underscore: '../libs/underscore/underscore'
    },

    shim: {
        'underscore': {
            exports: '_'
        }
    }
});