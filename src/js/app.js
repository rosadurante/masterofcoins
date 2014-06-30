/* globals define */
'use strict';

define('app', ['domReady!'], function (document) {
    
    var formElement = document.getElementById('input-form'),
        amountInputElement = document.getElementById('amount'),
        submitButton = document.getElementById('submit-form'),
        resetButton = document.getElementById('reset-form'),
        resultElement = document.getElementById('output-form'),

        reset = function () {
            amountInputElement.value = '';
            resultElement.innerHTML = '';
        },

        submit = function (e) {
            e.preventDefault();

            console.log('Submitted');
        };


    submitButton.addEventListener('click', submit, false);
    resetButton.addEventListener('click', reset, false);
    formElement.addEventListener('submit', submit, false);

    reset();
});