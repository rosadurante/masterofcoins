/* global _, describe, beforeEach, afterEach, it, expect */

'use strict';

describe('changeSpec', function () {
    var objects;

    beforeEach(function (done) {
        require(['changeMachine', 'app'], function (ChangeMachine, app) {
            objects = {
                ChangeMachine: ChangeMachine,
                App: app
            };
            done();
        });
    });

    it('ChangeMachine: validation', function () {
        var examples = [
            '4',
            '85',
            '197p',
            '2p',
            '1.87',
            '£1.23',
            '£2',
            '£10',
            '£1.87p',
            '£1p',
            '£1.p',
            '001.41p',
            '4.235p',
            '£1.257422457p',
            '',
            '1x',
            '£1x.0p',
            '£p'
        ];

        _.each(examples, function (value, index) {
            var amount = new objects.ChangeMachine(value);
            expect(amount.isValid()).toBe((index < 14));
        });
    });

    it('ChangeMachine: parse input', function () {
        var examples = [
                '4',
                '85',
                '197p',
                '2p',
                '1.87',
                '£1.23',
                '£2',
                '£10',
                '£1.87p',
                '£1p',
                '£1.p',
                '001.41p',
                '4.235p',
                '£1.257422457p'
            ],

            expected = [
                4,
                85,
                197,
                2,
                187,
                123,
                200,
                1000,
                187,
                100,
                100,
                141,
                424,
                126
            ];

        _.each(examples, function (value, index) {
            var amount = new objects.ChangeMachine(value);
            expect(amount.parse()).toBe(expected[index]);
        });
    });

    it('ChangeMachine: get coins', function () {
        var examples = [
                '4',
                '85',
                '197p',
                '2p',
                '1.87',
                '£1.23',
                '£2',
                '£10',
                '£1.87p',
                '£1p',
                '£1.p',
                '001.41p',
                '4.235p',
                '£1.257422457p'
            ],

            expected = [
                [{amountCoins: 2, valueCoin: 2}],
                [{amountCoins: 1, valueCoin: 50}, {amountCoins: 1, valueCoin: 20},
                 {amountCoins: 1, valueCoin: 10}, {amountCoins: 1, valueCoin: 5}],
                [{amountCoins: 1, valueCoin: 100}, {amountCoins: 1, valueCoin: 50},
                 {amountCoins: 2, valueCoin: 20}, {amountCoins: 1, valueCoin: 5},
                 {amountCoins: 1, valueCoin: 2}],
                [{amountCoins: 1, valueCoin: 2}],
                [{amountCoins: 1, valueCoin: 100}, {amountCoins: 1, valueCoin: 50},
                 {amountCoins: 1, valueCoin: 20}, {amountCoins: 1, valueCoin: 10},
                 {amountCoins: 1, valueCoin: 5}, {amountCoins: 1, valueCoin: 2}],
                [{amountCoins: 1, valueCoin: 100}, {amountCoins: 1, valueCoin: 20},
                 {amountCoins: 1, valueCoin: 2}, {amountCoins: 1, valueCoin: 1}],
                [{amountCoins: 1, valueCoin: 200}],
                [{amountCoins: 5, valueCoin: 200}],
                [{amountCoins: 1, valueCoin: 100}, {amountCoins: 1, valueCoin: 50},
                 {amountCoins: 1, valueCoin: 20}, {amountCoins: 1, valueCoin: 10},
                 {amountCoins: 1, valueCoin: 5}, {amountCoins: 1, valueCoin: 2}],
                [{amountCoins: 1, valueCoin: 100}],
                [{amountCoins: 1, valueCoin: 100}],
                [{amountCoins: 1, valueCoin: 100}, {amountCoins: 2, valueCoin: 20},
                 {amountCoins: 1, valueCoin: 1}],
                [{amountCoins: 2, valueCoin: 200}, {amountCoins: 1, valueCoin: 20},
                 {amountCoins: 2, valueCoin: 2}],
                [{amountCoins: 1, valueCoin: 100}, {amountCoins: 1, valueCoin: 20},
                 {amountCoins: 1, valueCoin: 5}, {amountCoins: 1, valueCoin: 1}]
            ];

        _.each(examples, function (value, index) {
            var amount = new objects.ChangeMachine(value);
            expect(amount.getCoins()).toEqual(expected[index]);
        });
    });
});