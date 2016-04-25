import * as css from 'css';
const tokenizer = require('css-selector-tokenizer');

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

function pickupInlineSelectors(selectorStringList: string[]) {
    return selectorStringList.map(selectorString => {
        const ast = tokenizer.parse(selectorString);
        if(!ast.nodes || !ast.nodes[0]) throw new Error('invalid selector');
        return ast.nodes[0].nodes;
    }).filter(selectorNode => {
        let elementCount = 0;
        let otherCount = 0;
        selectorNode.forEach(s => {
            switch(s.type) {
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
    }).map(selectorNode => {
        const classSelectors = selectorNode.filter(s => {
            return s.type === 'class'
        }).sort();
        const elementSelectors = selectorNode.filter(s => s.type === 'element');
        const result: InlineSelector = {
            classNames: classSelectors.map(s => s.name)
        };
        if(elementSelectors.length) {
            result.elementName = elementSelectors[0].name;
        }
        return result;
    });
}

export function parse(inputCss: string):any {
    const ast = css.parse(inputCss);
    if(!ast.stylesheet || ast.stylesheet.parsingErrors && ast.stylesheet.parsingErrors.length) throw new Error('invalid CSS');
    if(!ast.stylesheet.rules || !ast.stylesheet.rules.length) return {};

    const result: InlineStyle[] = [];
    ast.stylesheet.rules.forEach((_rule: {type: string}) => {
        if(_rule.type !== 'rule') return;
        const rule = <css.Rule>_rule;
        const declarations = rule.declarations.filter((d: {type: string}) => d.type === 'declaration').map((d:css.Declaration) => {
            return {property: d.property, value: d.value};
        });
        const inlineSelectors = pickupInlineSelectors(rule.selectors);
        inlineSelectors.forEach(selector => {
            result.push({
                selector,
                declarations
            });
        });
    });
    return result;
}
