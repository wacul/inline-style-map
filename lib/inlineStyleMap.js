"use strict";
var parse_1 = require('./parse');
var dictionary_1 = require('./dictionary');
var InlineStyleMap = (function () {
    function InlineStyleMap(css) {
        this._dict = new dictionary_1.Dictionary(parse_1.parse(css));
    }
    InlineStyleMap.prototype.lookup = function (selector) {
        return this._dict.lookup(selector);
    };
    return InlineStyleMap;
}());
exports.InlineStyleMap = InlineStyleMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5saW5lU3R5bGVNYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5saW5lU3R5bGVNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUFpRCxTQUFTLENBQUMsQ0FBQTtBQUMzRCwyQkFBeUIsY0FBYyxDQUFDLENBQUE7QUFFeEM7SUFFSSx3QkFBWSxHQUFXO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx1QkFBVSxDQUFDLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDRCwrQkFBTSxHQUFOLFVBQU8sUUFBd0I7UUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUlksc0JBQWMsaUJBUTFCLENBQUEifQ==