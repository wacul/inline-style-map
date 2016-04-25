import { InlineSelector } from './parse';
export declare class InlineStyleMap {
    private _dict;
    constructor(css: string);
    lookup(selector: InlineSelector): {
        property: string;
        value: string;
    }[];
}
