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

    afterEach(function () {
        var input = document.getElementById('amount'),
            output = document.getElementById('output-form');

        input.value = '';
        output.innerHTML = '';
    });

    it('App: submitting form successfully', function () {
        var input = document.getElementById('amount'),
            submitButton = document.getElementById('submit-form'),
            output = document.getElementById('output-form');

        expect(output.children.length).toBe(0);
        input.value = '£3.4';
        submitButton.click();

        expect(output.children).not.toBeUndefined();
        expect(_.contains(output.children[0].classList, 'success')).toBe(true);
    });

    it('App: submitting form failure', function () {
        var input = document.getElementById('amount'),
            submitButton = document.getElementById('submit-form'),
            output = document.getElementById('output-form');

        expect(output.children.length).toBe(0);
        input.value = '£3.4pp';
        submitButton.click();

        expect(output.children).not.toBeUndefined();
        expect(_.contains(output.children[0].classList, 'error')).toBe(true);
    });

    it('App: resetting form', function () {
        var input = document.getElementById('amount'),
            submitButton = document.getElementById('submit-form'),
            resetButton = document.getElementById('reset-form'),
            output = document.getElementById('output-form');

        expect(output.children.length).toBe(0);
        input.value = '23p';
        submitButton.click();

        expect(output.children).not.toBeUndefined();
        expect(output.children.length).toBe(1);

        resetButton.click();

        expect(input.value).toBe('');
        expect(output.children.length).toBe(0);
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