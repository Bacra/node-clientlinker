ClientLinker
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
npm install clientlinker --save
npm install clientlinker -g
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

var clientlinker = require('clientlinker');
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

### Run in Terminal

```shell
#### List all Clients and Methods
clientlinker list ./clientlinker.conf.js

#### Run action directly in Terminal
clientlinker run ./clientlinker.conf.js
clientlinker exec ./clientlinker.conf.js mail.method --body=body
```


# Upgrade

### 6.x.x => 7.0.0

 * Remove all sys flow. Please install and loadFlow for
  `httpproxy` `confighandler` `pkghandler` `debugger` `localfile` `logger`
 * Move `proxyRoute` of `linker` to `clientlinker-flow-httpproxy` pkg.
 * `anyToError(err, runner)` instead of `anyToError(err, runtime)`. You can get `runtime` with `runner.runtime`.
 * `err.fromClient` instead of `err.CLIENTLINKER_CLIENT`. `err.fromClientMethod` install of `err.CLIENTLINKER_ACTION`.
 * Remove `linker.run().runtime` & `linker.run().runtimePromise`. You can get `runtime` width `linker.lastRuntime` after `linker.run`.


### 5.x.x => 6.0.0

 * If flow handler return a Promise, it bind callback auto.
 * Running `callback.next` like `callback.next(true)`. Use `callback.nextAndResolve()` instead of previous caller.

If you do not modify custom flow and use `callback.next` in flow, the rpc will timeout.


### 4.x.x => 5.0.0

 * Please upgrade server first, if you are using `httpproxy` flow



[npm-image]: https://img.shields.io/npm/v/clientlinker.svg
[downloads-image]: https://img.shields.io/npm/dm/clientlinker.svg
[npm-url]: https://www.npmjs.org/package/clientlinker
[travis-image]: https://img.shields.io/travis/com/Bacra/node-clientlinker/master.svg?label=linux
[travis-url]: https://travis-ci.com/Bacra/node-clientlinker
[appveyor-image]: https://img.shields.io/appveyor/ci/Bacra/node-clientlinker/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/Bacra/node-clientlinker
[coveralls-image]: https://img.shields.io/coveralls/Bacra/node-clientlinker.svg
[coveralls-url]: https://coveralls.io/github/Bacra/node-clientlinker
[license-image]: https://img.shields.io/npm/l/clientlinker.svg
[install-size-url]: https://packagephobia.now.sh/result?p=clientlinker
[install-size-image]: https://packagephobia.now.sh/badge?p=clientlinker
