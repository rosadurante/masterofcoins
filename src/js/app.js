/* globals define */
'use strict';

define('app', ['domReady!', 'underscore', 'changeMachine'], function (document, _, ChangeMachine) {
    
    var formElement = document.getElementById('input-form'),
        amountInputElement = document.getElementById('amount'),
        submitButton = document.getElementById('submit-form'),
        resetButton = document.getElementById('reset-form'),
        resultElement = document.getElementById('output-form'),

        successTemplate = '' +
            '<div class="success">' +
                '<p>The most efficient change is: </p>' +
                '<ul>' +
                    '<% _.each(coins, function(coin) { %>' +
                        '<li class="coin">' +
                            '<p><%= coin.kind %>: <span><%= coin.amount %></span> coins</p>' +
                        '</li>' +
                    '<% }); %>' +
                '</ul>' +
            '</div>',

        rejectTemplate = '' +
            '<div class="error">' +
                '<p>The value introduced (<%- value %>) is not valid</p>' +
            '</div>',

        reset = function () {
            amountInputElement.value = '';
            resultElement.innerHTML = '';
        },

        displayCoins = function (coins) {
            var _getCoin = function (value) {
                    if (value > 100) { return '£' + (value / 100); }
                    else { return value + 'p'; }
                };

            coins = _.map(coins, function (item) {
                return {
                    amount: item.amountCoins,
                    kind: _getCoin(item.valueCoin)
                };
            });
            resultElement.innerHTML = _.template(successTemplate, {'coins': coins});
        },

        submit = function (e) {
            e.preventDefault();
            var change = new ChangeMachine(amountInputElement.value);

            if (change.isValid()) {
                displayCoins(change.getCoins());
            } else {
                resultElement.innerHTML = _.template(rejectTemplate, {'value': amountInputElement.value});
            }

            console.log('Submitted');
        };


    submitButton.addEventListener('click', submit, false);
    resetButton.addEventListener('click', reset, false);
    formElement.addEventListener('submit', submit, false);

    reset();
});