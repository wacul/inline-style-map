import {parse, InlineStyle} from './parse';
import * as assert from 'power-assert';

describe('parse', function() {
    it('parses from css strings to inline-style', function() {
        const inputCss = `
            a.foo {
                color: red;
            }
        `;
        const actual = parse(inputCss);
        const expected: InlineStyle[] = [
            {selector: {elementName: 'a', classNames: ['foo']}, declarations: [{property: 'color', value: 'red'}]},
        ];
        assert.deepEqual(actual, expected);
    });

    it('throws an error from invalid css string', function(done) {
        const inputCss = `
            a.foo {
                color: red;
        `;
        try {
            const actual = parse(inputCss);
        }catch(e) {
            done();
        }
    });

    it('returns an emply rule from an empty string', function() {
        const inputCss = ``;
        const actual = parse(inputCss);
        const expected: InlineStyle[] = [];
        assert.deepEqual(actual, expected);
    });

    it('ignores rules that includes spacing', function() {
        const inputCss = `
            div h1 { color: red; }
            div > h1 {color: red;}
        `;
        const actual = parse(inputCss);
        const expected: InlineStyle[] = [];
        assert.deepEqual(actual, expected);
    });

    it('ignores rules that includes pseudo elements', function() {
        const inputCss = `
            .hoge:before { color: red; }
        `;
        const actual = parse(inputCss);
        const expected: InlineStyle[] = [];
        assert.deepEqual(actual, expected);
    });

    it('ignores rules that includes attributes', function() {
        const inputCss = `
            a:[ng-if] { color: red; }
        `;
        const actual = parse(inputCss);
        const expected: InlineStyle[] = [];
        assert.deepEqual(actual, expected);
    });

    it('ignores rules that includes pseudo classes', function() {
        const inputCss = `
            :not(.hoge) { color: red; }
        `;
        const actual = parse(inputCss);
        const expected: InlineStyle[] = [];
        assert.deepEqual(actual, expected);
    });
});
