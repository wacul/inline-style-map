import {parse, InlineStyle, InlineSelector} from './parse';

function createKey(selector: InlineSelector) {
    const classNames = selector.classNames.slice().sort().join('.');
    return selector.elementName ? `${selector.elementName}.${classNames}` : classNames;
}

export class Specificity {
    public ids: number = 0;
    public classes: number = 0;
    public elements: number = 0;
    constructor() { }
}

export interface MatchResult {
    isMatch: boolean;
    specificity?: Specificity;
}

export function match(target: InlineSelector, rule: InlineSelector): MatchResult {
    let isMatch = true;
    const specificity = new Specificity();

    if (target.elementName && rule.elementName && target.elementName !== rule.elementName) {
        isMatch = false;
        return {isMatch};
    } else if(target.elementName && !rule.elementName) {
        specificity.elements = 0;
    } else if(target.elementName && rule.elementName && target.elementName === rule.elementName) {
        specificity.elements = 1;
    } else {
        specificity.elements = 0;
    }

    for(let i = 0; i < rule.classNames.length; i++) {
        if(target.classNames.some(tcn => tcn === rule.classNames[i])) {
            specificity.classes++;
        }else{
            isMatch = false;
            break;
        }
    }

    if(!isMatch) {
        return {isMatch};
    }else{
        return {isMatch, specificity};
    }
}

function compare(a: {matchResult: MatchResult}, b: {matchResult: MatchResult}) {
    if(a.matchResult.specificity.ids > b.matchResult.specificity.ids) return 1;
    if(a.matchResult.specificity.ids < b.matchResult.specificity.ids) return -1;
    if(a.matchResult.specificity.classes > b.matchResult.specificity.classes) return 1;
    if(a.matchResult.specificity.classes < b.matchResult.specificity.classes) return -1;
    if(a.matchResult.specificity.elements > b.matchResult.specificity.elements) return 1;
    if(a.matchResult.specificity.elements < b.matchResult.specificity.elements) return -1;
    return 0;
}

export class Dictionary {
    private _cache: {
        [queryKey: string]: {property: string; value: string}[]
    } = {};

    constructor(private _inlineStyles: InlineStyle[]) {
    }

    lookup(selector: InlineSelector) {
        const queryKey = createKey(selector);
        if(this._cache[queryKey]) return this._cache[queryKey];
        const hitList = this._inlineStyles
            .map(style => ({
                matchResult: match(selector, style.selector),
                declarations: style.declarations
            }))
            .filter(result => result.matchResult.isMatch)
            .sort(compare)
        ;
        if(hitList.length) {
            const propList: {propList: string; value: string}[] = [];
            const props: {[prop: string]: string} = {};
            hitList.forEach(holder => {
                holder.declarations.forEach(declaration => {
                    props[declaration.property] = declaration.value;
                });
            });
            this._cache[queryKey] = Object.keys(props).map(p => {
                return {
                    property: p,
                    value: props[p]
                }
            });
            return this._cache[queryKey];
        }else{
            return null;
        }
    }
}
