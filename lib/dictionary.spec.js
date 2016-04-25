"use strict";
var dictionary_1 = require('./dictionary');
var assert = require('power-assert');
describe('match', function () {
    it('returns match result from 2 selectors', function () {
        var target = { elementName: 'a', classNames: [] };
        var rule = { elementName: 'a', classNames: [] };
        var actual = dictionary_1.match(target, rule);
        var expected = {
            isMatch: true,
            specificity: { ids: 0, elements: 1, classes: 0 }
        };
        assert.deepEqual(actual, expected);
    });
    it('returns isMatch:false from rule and target which have different element names', function () {
        var target = { elementName: 'h2', classNames: [] };
        var rule = { elementName: 'h1', classNames: [] };
        var actual = dictionary_1.match(target, rule);
        var expected = {
            isMatch: false
        };
        assert.deepEqual(actual, expected);
    });
    it('counts specifications when they have same classNames', function () {
        var target = { classNames: ['hoge', 'foo'] };
        var rule = { classNames: ['hoge', 'foo'] };
        var actual = dictionary_1.match(target, rule);
        var expected = {
            isMatch: true,
            specificity: { ids: 0, elements: 0, classes: 2 }
        };
        assert.deepEqual(actual, expected);
    });
    it('counts specifications when classNames of rule include one of target classNames', function () {
        var target = { classNames: ['hoge', 'foo'] };
        var rule = { classNames: ['hoge'] };
        var actual = dictionary_1.match(target, rule);
        var expected = {
            isMatch: true,
            specificity: { ids: 0, elements: 0, classes: 1 }
        };
        assert.deepEqual(actual, expected);
    });
    it('returns isMatch: false when classNames of rule includes one of no-existing in target', function () {
        var target = { classNames: ['hoge'] };
        var rule = { classNames: ['hoge', 'foo'] };
        var actual = dictionary_1.match(target, rule);
        var expected = {
            isMatch: false
        };
        assert.deepEqual(actual, expected);
    });
    it('returns composite specificity', function () {
        var target = { elementName: 'a', classNames: ['piyo', 'foo', 'bar', 'hoge'] };
        var rule = { elementName: 'a', classNames: ['hoge', 'foo'] };
        var actual = dictionary_1.match(target, rule);
        var expected = {
            isMatch: true,
            specificity: { ids: 0, elements: 1, classes: 2 }
        };
        assert.deepEqual(actual, expected);
    });
});
describe('Dictionary', function () {
    describe('lookup', function () {
        it('returns null from emply styles', function () {
            var dict = new dictionary_1.Dictionary([]);
            var actual = dict.lookup({ classNames: [] });
            assert(actual === null);
        });
        it('retuns declarations from 1 style', function () {
            var dict = new dictionary_1.Dictionary([
                { selector: { elementName: 'a', classNames: [] }, declarations: [{ property: 'color', value: 'red' }] }
            ]);
            var actual = dict.lookup({ elementName: 'a', classNames: [] });
            var expected = [{ property: 'color', value: 'red' }];
            assert.deepEqual(actual, expected);
        });
        it('retuns specificity based declarations', function () {
            var dict = new dictionary_1.Dictionary([
                { selector: { elementName: 'a', classNames: [] }, declarations: [{ property: 'color', value: 'red' }] },
                { selector: { elementName: 'a', classNames: ['hoge'] }, declarations: [{ property: 'color', value: 'blue' }] }
            ]);
            var actual = dict.lookup({ elementName: 'a', classNames: ['hoge'] });
            var expected = [{ property: 'color', value: 'blue' }];
            assert.deepEqual(actual, expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljdGlvbmFyeS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RpY3Rpb25hcnkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsMkJBQTBELGNBQWMsQ0FBQyxDQUFBO0FBQ3pFLElBQVksTUFBTSxXQUFNLGNBQWMsQ0FBQyxDQUFBO0FBRXZDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7SUFDZCxFQUFFLENBQUMsdUNBQXVDLEVBQUU7UUFDeEMsSUFBTSxNQUFNLEdBQW1CLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDcEUsSUFBTSxJQUFJLEdBQW1CLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDbEUsSUFBTSxNQUFNLEdBQUcsa0JBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBTSxRQUFRLEdBQWdCO1lBQzFCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7U0FDbkQsQ0FBQztRQUNGLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLCtFQUErRSxFQUFFO1FBQ2hGLElBQU0sTUFBTSxHQUFtQixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3JFLElBQU0sSUFBSSxHQUFtQixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ25FLElBQU0sTUFBTSxHQUFHLGtCQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQU0sUUFBUSxHQUFnQjtZQUMxQixPQUFPLEVBQUUsS0FBSztTQUNqQixDQUFDO1FBQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsc0RBQXNELEVBQUU7UUFDdkQsSUFBTSxNQUFNLEdBQW1CLEVBQUUsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDL0QsSUFBTSxJQUFJLEdBQW1CLEVBQUUsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDN0QsSUFBTSxNQUFNLEdBQUcsa0JBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBTSxRQUFRLEdBQWdCO1lBQzFCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7U0FDbkQsQ0FBQTtRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdGQUFnRixFQUFFO1FBQ2pGLElBQU0sTUFBTSxHQUFtQixFQUFFLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQy9ELElBQU0sSUFBSSxHQUFtQixFQUFFLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDdEQsSUFBTSxNQUFNLEdBQUcsa0JBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBTSxRQUFRLEdBQWdCO1lBQzFCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7U0FDbkQsQ0FBQTtRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHNGQUFzRixFQUFFO1FBQ3ZGLElBQU0sTUFBTSxHQUFtQixFQUFFLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDeEQsSUFBTSxJQUFJLEdBQW1CLEVBQUUsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDN0QsSUFBTSxNQUFNLEdBQUcsa0JBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBTSxRQUFRLEdBQWdCO1lBQzFCLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUE7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQkFBK0IsRUFBRTtRQUNoQyxJQUFNLE1BQU0sR0FBbUIsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDaEcsSUFBTSxJQUFJLEdBQW1CLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUMvRSxJQUFNLE1BQU0sR0FBRyxrQkFBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFNLFFBQVEsR0FBZ0I7WUFDMUIsT0FBTyxFQUFFLElBQUk7WUFDYixXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtTQUNuRCxDQUFBO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUU7SUFDbkIsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNmLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtZQUNqQyxJQUFNLElBQUksR0FBRyxJQUFJLHVCQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsa0NBQWtDLEVBQUU7WUFDbkMsSUFBTSxJQUFJLEdBQUcsSUFBSSx1QkFBVSxDQUFDO2dCQUN4QixFQUFDLFFBQVEsRUFBRSxFQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBQyxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBQzthQUNwRyxDQUFDLENBQUM7WUFDSCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFNLFFBQVEsR0FBRyxDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRTtZQUN4QyxJQUFNLElBQUksR0FBRyxJQUFJLHVCQUFVLENBQUM7Z0JBQ3hCLEVBQUMsUUFBUSxFQUFFLEVBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFDO2dCQUNqRyxFQUFDLFFBQVEsRUFBRSxFQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLEVBQUM7YUFDM0csQ0FBQyxDQUFDO1lBQ0gsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQU0sUUFBUSxHQUFHLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9