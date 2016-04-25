import { InlineStyle, InlineSelector } from './parse';
export declare class Specificity {
    ids: number;
    classes: number;
    elements: number;
    constructor();
}
export interface MatchResult {
    isMatch: boolean;
    specificity?: Specificity;
}
export declare function match(target: InlineSelector, rule: InlineSelector): MatchResult;
export declare class Dictionary {
    private _inlineStyles;
    private _cache;
    constructor(_inlineStyles: InlineStyle[]);
    lookup(selector: InlineSelector): {
        property: string;
        value: string;
    }[];
}
