/* global describe, beforeEach, it, expect */

'use strict';

describe('appSpec', function () {
    var output;

    beforeEach(function () {
        require(['app'], function () {
            document.getElementById('amount').value = '£3.4';
            document.getElementById('submit-form').click();

            output = document.getElementById('output-form').children;
        });
    });

    it('calculate successfully', function () {
        expect(output).toNotBe(undefined);
    });
});