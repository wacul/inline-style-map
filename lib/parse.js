"use strict";
var css = require('css');
var tokenizer = require('css-selector-tokenizer');
function pickupInlineSelectors(selectorStringList) {
    return selectorStringList.map(function (selectorString) {
        var ast = tokenizer.parse(selectorString);
        if (!ast.nodes || !ast.nodes[0])
            throw new Error('invalid selector');
        return ast.nodes[0].nodes;
    }).filter(function (selectorNode) {
        var elementCount = 0;
        var otherCount = 0;
        selectorNode.forEach(function (s) {
            switch (s.type) {
                case 'element':
                    elementCount++;
                    break;
                case 'class':
                    break;
                default:
                    otherCount++;
            }
        });
        return otherCount === 0 && elementCount <= 1;
    }).map(function (selectorNode) {
        var classSelectors = selectorNode.filter(function (s) {
            return s.type === 'class';
        }).sort();
        var elementSelectors = selectorNode.filter(function (s) { return s.type === 'element'; });
        var result = {
            classNames: classSelectors.map(function (s) { return s.name; })
        };
        if (elementSelectors.length) {
            result.elementName = elementSelectors[0].name;
        }
        return result;
    });
}
function parse(inputCss) {
    var ast = css.parse(inputCss);
    if (!ast.stylesheet || ast.stylesheet.parsingErrors && ast.stylesheet.parsingErrors.length)
        throw new Error('invalid CSS');
    if (!ast.stylesheet.rules || !ast.stylesheet.rules.length)
        return {};
    var result = [];
    ast.stylesheet.rules.forEach(function (_rule) {
        if (_rule.type !== 'rule')
            return;
        var rule = _rule;
        var declarations = rule.declarations.filter(function (d) { return d.type === 'declaration'; }).map(function (d) {
            return { property: d.property, value: d.value };
        });
        var inlineSelectors = pickupInlineSelectors(rule.selectors);
        inlineSelectors.forEach(function (selector) {
            result.push({
                selector: selector,
                declarations: declarations
            });
        });
    });
    return result;
}
exports.parse = parse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGFyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksR0FBRyxXQUFNLEtBQUssQ0FBQyxDQUFBO0FBQzNCLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBZXBELCtCQUErQixrQkFBNEI7SUFDdkQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFBLGNBQWM7UUFDeEMsSUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QyxFQUFFLENBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5QixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxZQUFZO1FBQ2xCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDbkIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDbEIsTUFBTSxDQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1osS0FBSyxTQUFTO29CQUNWLFlBQVksRUFBRSxDQUFDO29CQUNmLEtBQUssQ0FBQztnQkFDVixLQUFLLE9BQU87b0JBQ1IsS0FBSyxDQUFDO2dCQUNWO29CQUNJLFVBQVUsRUFBRSxDQUFDO1lBQ3JCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFD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