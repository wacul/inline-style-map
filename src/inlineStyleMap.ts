import {parse, InlineStyle, InlineSelector} from './parse';
import {Dictionary} from './dictionary';

export class InlineStyleMap {
    private _dict: Dictionary;
    constructor(css: string) {
        this._dict = new Dictionary(parse(css));
    }
    lookup(selector: InlineSelector) {
        return this._dict.lookup(selector);
    }
}

