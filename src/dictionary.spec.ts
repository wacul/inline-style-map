import {InlineSelector} from './parse';
import {Dictionary, match, MatchResult, Specificity} from './dictionary';
import * as assert from 'power-assert';

describe('match', function() {
    it('returns match result from 2 selectors', function() {
        const target: InlineSelector = { elementName: 'a', classNames: [] };
        const rule: InlineSelector = { elementName: 'a', classNames: [] };
        const actual = match(target, rule);
        const expected: MatchResult = {
            isMatch: true,
            specificity: { ids: 0, elements: 1, classes: 0 }
        };
        assert.deepEqual(actual, expected);
    });

    it('returns isMatch:false from rule and target which have different element names', function() {
        const target: InlineSelector = { elementName: 'h2', classNames: [] };
        const rule: InlineSelector = { elementName: 'h1', classNames: [] };
        const actual = match(target, rule);
        const expected: MatchResult = {
            isMatch: false
        };
        assert.deepEqual(actual, expected);
    });

    it('counts specifications when they have same classNames', function() {
        const target: InlineSelector = { classNames: ['hoge', 'foo'] };
        const rule: InlineSelector = { classNames: ['hoge', 'foo'] };
        const actual = match(target, rule);
        const expected: MatchResult = {
            isMatch: true,
            specificity: { ids: 0, elements: 0, classes: 2 }
        }
        assert.deepEqual(actual, expected);
    });

    it('counts specifications when classNames of rule include one of target classNames', function() {
        const target: InlineSelector = { classNames: ['hoge', 'foo'] };
        const rule: InlineSelector = { classNames: ['hoge'] };
        const actual = match(target, rule);
        const expected: MatchResult = {
            isMatch: true,
            specificity: { ids: 0, elements: 0, classes: 1 }
        }
        assert.deepEqual(actual, expected);
    });

    it('returns isMatch: false when classNames of rule includes one of no-existing in target', function() {
        const target: InlineSelector = { classNames: ['hoge'] };
        const rule: InlineSelector = { classNames: ['hoge', 'foo'] };
        const actual = match(target, rule);
        const expected: MatchResult = {
            isMatch: false
        }
        assert.deepEqual(actual, expected);
    });

    it('returns composite specificity', function() {
        const target: InlineSelector = { elementName: 'a', classNames: ['piyo', 'foo', 'bar', 'hoge'] };
        const rule: InlineSelector = { elementName: 'a', classNames: ['hoge', 'foo'] };
        const actual = match(target, rule);
        const expected: MatchResult = {
            isMatch: true,
            specificity: { ids: 0, elements: 1, classes: 2 }
        }
        assert.deepEqual(actual, expected);
    });
});

describe('Dictionary', function() {
    describe('lookup', function() {
        it('returns null from emply styles', function() {
            const dict = new Dictionary([]);
            const actual = dict.lookup({classNames: []});
            assert(actual === null);
        });
        it('retuns declarations from 1 style', function () {
            const dict = new Dictionary([
                {selector: {elementName: 'a', classNames: []}, declarations: [{property: 'color', value: 'red'}]}
            ]);
            const actual = dict.lookup({elementName: 'a', classNames: []});
            const expected = [{property: 'color', value: 'red'}];
            assert.deepEqual(actual, expected);
        });
        it('retuns specificity based declarations', function () {
            const dict = new Dictionary([
                {selector: {elementName: 'a', classNames: []}, declarations: [{property: 'color', value: 'red'}]},
                {selector: {elementName: 'a', classNames: ['hoge']}, declarations: [{property: 'color', value: 'blue'}]}
            ]);
            const actual = dict.lookup({elementName: 'a', classNames: ['hoge']});
            const expected = [{property: 'color', value: 'blue'}];
            assert.deepEqual(actual, expected);
        });
    });
});

