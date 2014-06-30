/* globals define, window */
'use strict';

define('domReady', function () {
    function domReady(callback) {
        window.addEventListener('domReady', function () {
            callback.call(document);
        });
    }

    domReady.load = function (name, req, onLoad) {
        return onLoad(document);
    };

    return domReady;
});