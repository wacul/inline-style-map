# inline-style-map

Retrieves inline style declarations from CSS rules.

## Usage 

```js
const InlineStyleMap = require('inline-style-map').InlineStyleMap;
const map = new InlineStyleMap(`
  a.hoge {
    color: blue;
    font-size: 20px;
  }
  a.hoge.foo {
    color: red;
  }
`);

console.log(map.lookup({
  elementName: 'a',
  classNames: ['hoge', 'foo']
}));
// [{property: 'color': value: 'red}, {property: 'font-size', value: '20px'}]

```
