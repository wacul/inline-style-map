"use strict";
function createKey(selector) {
    var classNames = selector.classNames.slice().sort().join('.');
    return selector.elementName ? selector.elementName + "." + classNames : classNames;
}
var Specificity = (function () {
    function Specificity() {
        this.ids = 0;
        this.classes = 0;
        this.elements = 0;
    }
    return Specificity;
}());
exports.Specificity = Specificity;
function match(target, rule) {
    var isMatch = true;
    var specificity = new Specificity();
    if (target.elementName && rule.elementName && target.elementName !== rule.elementName) {
        isMatch = false;
        return { isMatch: isMatch };
    }
    else if (target.elementName && !rule.elementName) {
        specificity.elements = 0;
    }
    else if (target.elementName && rule.elementName && target.elementName === rule.elementName) {
        specificity.elements = 1;
    }
    else {
        specificity.elements = 0;
    }
    var _loop_1 = function(i) {
        if (target.classNames.some(function (tcn) { return tcn === rule.classNames[i]; })) {
            specificity.classes++;
        }
        else {
            isMatch = false;
            return "break";
        }
    };
    for (var i = 0; i < rule.classNames.length; i++) {
        var state_1 = _loop_1(i);
        if (state_1 === "break") break;
    }
    if (!isMatch) {
        return { isMatch: isMatch };
    }
    else {
        return { isMatch: isMatch, specificity: specificity };
    }
}
exports.match = match;
function compare(a, b) {
    if (a.matchResult.specificity.ids > b.matchResult.specificity.ids)
        return 1;
    if (a.matchResult.specificity.ids < b.matchResult.specificity.ids)
        return -1;
    if (a.matchResult.specificity.classes > b.matchResult.specificity.classes)
        return 1;
    if (a.matchResult.specificity.classes < b.matchResult.specificity.classes)
        return -1;
    if (a.matchResult.specificity.elements > b.matchResult.specificity.elements)
        return 1;
    if (a.matchResult.specificity.elements < b.matchResult.specificity.elements)
        return -1;
    return 0;
}
var Dictionary = (function () {
    function Dictionary(_inlineStyles) {
        this._inlineStyles = _inlineStyles;
        this._cache = {};
    }
    Dictionary.prototype.lookup = function (selector) {
        var queryKey = createKey(selector);
        if (this._cache[queryKey])
            return this._cache[queryKey];
        var hitList = this._inlineStyles
            .map(function (style) { return ({
            matchResult: match(selector, style.selector),
            declarations: style.declarations
        }); })
            .filter(function (result) { return result.matchResult.isMatch; })
            .sort(compare);
        if (hitList.length) {
            var propList = [];
            var props_1 = {};
            hitList.forEach(function (holder) {
                holder.declarations.forEach(function (declaration) {
                    props_1[declaration.property] = declaration.value;
                });
            });
            this._cache[queryKey] = Object.keys(props_1).map(function (p) {
                return {
                    property: p,
                    value: props_1[p]
                };
            });
            return this._cache[queryKey];
        }
        else {
            return null;
        }
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljdGlvbmFyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxtQkFBbUIsUUFBd0I7SUFDdkMsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQU0sUUFBUSxDQUFDLFdBQVcsU0FBSSxVQUFZLEdBQUcsVUFBVSxDQUFDO0FBQ3ZGLENBQUM7QUFFRDtJQUlJO1FBSE8sUUFBRyxHQUFXLENBQUMsQ0FBQztRQUNoQixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLGFBQVEsR0FBVyxDQUFDLENBQUM7SUFDWixDQUFDO0lBQ3JCLGtCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFMWSxtQkFBVyxjQUt2QixDQUFBO0FBT0QsZUFBc0IsTUFBc0IsRUFBRSxJQUFvQjtJQUM5RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDbkIsSUFBTSxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUV0QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwRixPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxFQUFDLFNBQUEsT0FBTyxFQUFDLENBQUM7SUFDckIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDaEQsV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUFDLElBQUksQ0FBQyxF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