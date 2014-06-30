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
                 *  - Without decimals (without '.'): "£3", "£10".
                 *  - With a '.' as last character of the number: "£5.", "£1.p"
                 *  - With a '.00' as last characteres of the number: "£1.00", "£2.00p"
                 */

                if (_.indexOf(amount, '£') !== -1) {
                    if (_.indexOf(amount, '.') === -1) {
                        amount += '00';
                    } else if (_.contains(_.last(amount, 2), '.') || _.contains(_.last(amount, 1), '.')) {
                        amount = amount.replace('.', '') + '00';
                    } else if (_.indexOf(amount, '.00') !== -1 && _.indexOf(amount, '.00') + 3 === amount.length) {
                        amount = amount.replace('.', '');
                    }
                }

                amount = amount.replace('£', '').replace('p', '');
                amount = parseFloat(parseFloat(amount).toFixed(2));

                /** Avoiding bad round from javascript 
                    parseInt(amount * 100, 10) --> 2.07 = 206 
                    parseInt((amount * 1000) / 10, 10) --> 2.07 = 207 */

                return (amount - parseInt(amount, 10) > 0) ? parseInt((amount * 1000) / 10, 10) : amount;
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