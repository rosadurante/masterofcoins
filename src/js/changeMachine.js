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

                /** Fixing some special cases when the user uses "£" character at the beginning:
                 *  - Using "£" at the beginning and without decimals (without '.'): "£3", "£10".
                 *  -- Those need to be converted to float: "3.00", "10.00"
                 *  - Not using "£" at the beginning and not having a '.': "345p", "23"
                 *  -- Those need to be converted to float: "3.45", "0.23"
                 */

                if (amount.indexOf('£') !== -1 && amount.indexOf('.') === -1) {
                    amount += '.00';
                }

                if (amount.indexOf('£') === -1 && amount.indexOf('.') === -1) {
                    amount = (parseInt(amount.replace('p', ''), 10) / 100).toString();
                }

                amount = amount.replace('£', '').replace('p', '');

                /** Avoiding bad calculations (round)
                    parseFloat(parseFloat(amount).toFixed(2)) --> 4.99 = 5
                    parseInt(parseFloat(amount).toFixed(2).replace('.',''), 10) --> 4.99 = 499 */

                amount = parseInt(parseFloat(amount).toFixed(2).replace('.', ''), 10);
                return amount;
            },

            getCoins: function () {
                var remaining,
                    coins = [],
                    amount = this.parse();

                _.each([200, 100, 50, 20, 10, 5, 2], function (valueCoin) {
                    remaining = amount % valueCoin;

                    if (remaining < amount) {
                        coins.push({
                            'valueCoin': valueCoin,
                            'amountCoins': (amount - remaining) / valueCoin
                        });
                        amount = remaining;
                    }
                });

                /** If there is still some amount remaining, there would be 1p coins */

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