"use strict";
var parse_1 = require('./parse');
var assert = require('power-assert');
describe('parse', function () {
    it('parses from css strings to inline-style', function () {
        var inputCss = "\n            a.foo {\n                color: red;\n            }\n        ";
        var actual = parse_1.parse(inputCss);
        var expected = [
            { selector: { elementName: 'a', classNames: ['foo'] }, declarations: [{ property: 'color', value: 'red' }] },
        ];
        assert.deepEqual(actual, expected);
    });
    it('throws an error from invalid css string', function (done) {
        var inputCss = "\n            a.foo {\n                color: red;\n        ";
        try {
            var actual = parse_1.parse(inputCss);
        }
        catch (e) {
            done();
        }
    });
    it('returns an emply rule from an empty string', function () {
        var inputCss = "";
        var actual = parse_1.parse(inputCss);
        var expected = [];
        assert.deepEqual(actual, expected);
    });
    it('ignores rules that includes spacing', function () {
        var inputCss = "\n            div h1 { color: red; }\n            div > h1 {color: red;}\n        ";
        var actual = parse_1.parse(inputCss);
        var expected = [];
        assert.deepEqual(actual, expected);
    });
    it('ignores rules that includes pseudo elements', function () {
        var inputCss = "\n            .hoge:before { color: red; }\n        ";
        var actual = parse_1.parse(inputCss);
        var expected = [];
        assert.deepEqual(actual, expected);
    });
    it('ignores rules that includes attributes', function () {
        var inputCss = "\n            a:[ng-if] { color: red; }\n        ";
        var actual = parse_1.parse(inputCss);
        var expected = [];
        assert.deepEqual(actual, expected);
    });
    it('ignores rules that includes pseudo classes', function () {
        var inputCss = "\n            :not(.hoge) { color: red; }\n        ";
        var actual = parse_1.parse(inputCss);
        var expected = [];
        assert.deepEqual(actual, expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2Uuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJzZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBaUMsU0FBUyxDQUFDLENBQUE7QUFDM0MsSUFBWSxNQUFNLFdBQU0sY0FBYyxDQUFDLENBQUE7QUFFdkMsUUFBUSxDQUFDLE9BQU8sRUFBRTtJQUNkLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRTtRQUMxQyxJQUFNLFFBQVEsR0FBRyw2RUFJaEIsQ0FBQztRQUNGLElBQU0sTUFBTSxHQUFHLGFBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixJQUFNLFFBQVEsR0FBa0I7WUFDNUIsRUFBQyxRQUFRLEVBQUUsRUFBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFDO1NBQ3pHLENBQUM7UUFDRixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxVQUFTLElBQUk7UUFDdkQsSUFBTSxRQUFRLEdBQUcsOERBR2hCLENBQUM7UUFDRixJQUFJLENBQUM7WUFDRCxJQUFNLE1BQU0sR0FBRyxhQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUFBLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRTtRQUM3QyxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBTSxNQUFNLEdBQUcsYUFBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLElBQU0sUUFBUSxHQUFrQixFQUFFLENBQUM7UUFDbkMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUNBQXFDLEVBQUU7UUFDdEMsSUFBTSxRQUFRLEdBQUcsb0ZBR2hCLENBQUM7UUFDRixJQUFNLE1BQU0sR0FBRyxhQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0IsSUFBTSxRQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUNuQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtRQUM5QyxJQUFNLFFBQVEsR0FBRyxzREFFaEIsQ0FBQztRQUNGLElBQU0sTUFBTSxHQUFHLGFBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixJQUFNLFFBQVEsR0FBa0IsRUFBRSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdDQUF3QyxFQUFFO1FBQ3pDLElBQU0sUUFBUSxHQUFHLG1EQUVoQixDQUFDO1FBQ0YsSUFBTSxNQUFNLEdBQUcsYUFBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLElBQU0sUUFBUSxHQUFrQixFQUFFLENBQUM7UUFDbkMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNENBQTRDLEVBQUU7UUFDN0MsSUFBTSxRQUFRLEdBQUcscURBRWhCLENBQUM7UUFDRixJQUFNLE1BQU0sR0FBRyxhQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0IsSUFBTSxRQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUNuQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=