ClientLinker-Core
==================

Linker all clients whether rpc, addon, http request, mock data, local file ...

A solution to break out of network and OS.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Appveyor Status][appveyor-image]][appveyor-url]
[![Coveralls][coveralls-image]][coveralls-url]
[![NPM License][license-image]][npm-url]
[![Install Size][install-size-image]][install-size-url]

# Install

```shell
npm install clientlinker-core --save
```

# Useage

## Options

Linker Options Exmaple, see [Optons](https://github.com/Bacra/node-clientlinker/wiki/Linker-Options)
or [Self Flows Options](https://github.com/Bacra/node-clientlinker/wiki/Self-Flows-Options)

```javascript
{
  flows: ['logger', 'pkghandler', 'httpproxy'],
  defaults: {
    anyToError: true,
    timeout: 4000
  },
  clients: {
    mail: {
      // modify defaults flows
      flows: ['confighandler', 'httpproxy'],
      confighandler: {
        read: function(query, body, callback, options) {
          callback(null, {content: 'hi,'});
        },
        send: function(query, body, callback, options) {
          return Promise.resolve({id: 'xxxx'});
        }
      }
    },

    // use defaults
    profile: {
      pkghandler: __dirname+'/clients/profile.js'
    }
  }
}
```

## Initialize

```javascript
// `clientlinker.conf.js` file content

var clientlinker = require('clientlinker-core');
var linker = clientlinker(options);

// Register flows
linker.flow('confighandler', require('clientlinker-flow-confighandler'));
linker.flow('logger', require('clientlinker-flow-logger'));
linker.flow('httpproxy', require('clientlinker-flow-httpproxy'));
linker.flow('pkghandler', require('clientlinker-flow-pkghandler'));

// Add clients outsid of config step
linker.client(name, clientOptions);

module.exports = linker;
```


## Run

### Run in Server

```javascript
var linker = require('./clientlinker.conf.js');

linker.run('mail.read', userid, {mailid: 'xxxx'}, callback, options);

// or use promise
linker.run('mail.read', userid, {mailid: 'xxxx'}, options)
  .then(function(data){});
```

### Run in Shell

```javascript
// you can use `runInShell` instead of `run`.
// Of course, you can continue to use `run`.
// example

var linker = require('./clientlinker.conf.js');

linker.runInShell('mail.read', userid, {mailid: 'xxxx'}, callback, options);
```

[npm-image]: http://img.shields.io/npm/v/clientlinker-core.svg
[downloads-image]: http://img.shields.io/npm/dm/clientlinker-core.svg
[npm-url]: https://www.npmjs.org/package/clientlinker-core
[travis-image]: https://travis-ci.com/Bacra/node-clientlinker-core.svg?branch=master
[travis-url]: https://travis-ci.com/Bacra/node-clientlinker-core
[appveyor-image]: https://img.shields.io/appveyor/ci/Bacra/node-clientlinker-core/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/Bacra/node-clientlinker-core
[coveralls-image]: https://img.shields.io/coveralls/Bacra/node-clientlinker-core.svg
[coveralls-url]: https://coveralls.io/github/Bacra/node-clientlinker-core
[license-image]: http://img.shields.io/npm/l/clientlinker-core.svg
[install-size-url]: https://packagephobia.now.sh/result?p=clientlinker-core
[install-size-image]: https://packagephobia.now.sh/badge?p=clientlinker-core