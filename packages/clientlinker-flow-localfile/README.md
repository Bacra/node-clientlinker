Clientlinker-flow-localfile
========================

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]
[![NPM License][license-image]][npm-url]
[![Install Size][install-size-image]][install-size-url]


# Install

Install `clientlinker` pkg

```shell
npm i clientlinker --save
```

Install flow pkg

```shell
npm i clientlinker-flow-localfile --save
```


# Usage

```javascript
var clientlinker = require('clientlinker');
var linker = clientlinker({
  flows: ['localfile'],
  clients: {
    client: {
      localfile: __dirname+'/test/localfile/client/'
    }
  }
});

linker.flow('localfile', require('clientlinker-flow-localfile'));

// use
linker.run('client.js', null, {id: 13})
  .then(function(){});
```


[npm-image]: https://img.shields.io/npm/v/clientlinker-flow-localfile.svg
[downloads-image]: https://img.shields.io/npm/dm/clientlinker-flow-localfile.svg
[npm-url]: https://www.npmjs.org/package/clientlinker-flow-localfile
[license-image]: https://img.shields.io/npm/l/clientlinker-flow-localfile.svg
[install-size-url]: https://packagephobia.now.sh/result?p=clientlinker-flow-localfile
[install-size-image]: https://packagephobia.now.sh/badge?p=clientlinker-flow-localfile
