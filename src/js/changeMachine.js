/* globals define */
'use strict';

define('changeMachine', ['underscore'], function (_) {
    
    var ChangeMachine = function (amount) {
            this.amount = amount;
        },

        behaviour = {
            isValid: function () {
                var re = new RegExp('^(£?)[0-9]+([.]?)[0-9]*(p?)$');
                return re.test(this.amount);
            },

            parse: function () {
                var amount = this.amount;
                amount = amount.replace('£', '').replace('p', '');
                amount = parseFloat(parseFloat(amount).toFixed(2));

                return (amount - parseInt(amount, 10) > 0) ? parseInt(amount * 100, 10) : amount;
            },

            getCoins: function () {
                var rest, coins = [], amount = this.parse();

                _.each([200, 100, 50, 20, 10, 5, 2], function (valueCoin) {
                    rest = amount % valueCoin;
                    if (rest < amount) {
                        coins.push({
                            'valueCoin': valueCoin,
                            'amountCoins': (amount - rest) / valueCoin
                        });

                        amount = rest;
                    }
                });

                if (amount) {
                    coins.push({
                        'valueCoin': 1,
                        'amountCoins': amount
                    });
                }

                return coins;
            }
        };

    _.extend(ChangeMachine.prototype, behaviour);
    return ChangeMachine;
});