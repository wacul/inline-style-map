export interface InlineSelector {
    classNames: string[];
    elementName?: string;
}
export interface InlineStyle {
    selector: InlineSelector;
    declarations: {
        property: string;
        value: string;
    }[];
}
export declare function parse(inputCss: string): any;
