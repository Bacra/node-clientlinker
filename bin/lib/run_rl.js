"use strict";

var Promise		= require('bluebird');
var rlutils		= require('./rlutils');
var printTpl	= require('./print_tpl');
var stdout		= require('./stdout');
var commandActions = require('./command_actions');
var rl;

exports.start = start;
function start(linker, allMethods)
{
	if (!rl) rl = require('./get_rl');

	stdout.log(printTpl.rlRunHeader());
	var ActionParams = {};

	rlaction(allMethods, ActionParams)
		.then(function()
		{
			return rlparam(linker, rl, 'Query', ActionParams);
		})
		.then(function()
		{
			return rlparam(linker, rl, 'Body', ActionParams);
		})
		.then(function()
		{
			return rlparam(linker, rl, 'Options', ActionParams);
		})
		.then(function()
		{
			return commandActions.runAction(
					linker,
					ActionParams.action,
					ActionParams.query,
					ActionParams.body,
					ActionParams.options
				)
				// 忽略允许时产生的错误
				// runAction 会负责输出错误
				.catch(function(){});
		})
		.catch(function(err)
		{
			var str = printTpl.runActionUnexpectedError(ActionParams.action, err);
			stdout.log(str);
		})
		.then(function()
		{
			stdout.log('\n\n\n');
			start(linker, allMethods);
		});
}


function rlaction(allMethods, ActionParams)
{
	return rl.question('Action :  ')
		.then(function(str)
		{
			var action = rlutils.parseAction(str, allMethods);
			if (action)
			{
				ActionParams.action = action;
				stdout.log(' ==> Action is <%s> <==', rlutils.colors.green(action));
			}
			else
			{
				stdout.log(' ==> No Action <%s> <==', rlutils.colors.red(str));
				return rlaction(allMethods, ActionParams);
			}
		});
}

function rlparam(linker, rl, key, ActionParams)
{
	return rl.question(key+' :  ')
		.then(function(str)
		{
			var data = rlutils.parseParam(linker, str);
			ActionParams[key.toLowerCase()] = data;
			stdout.log(' ==> %s <==\n%s', key, rlutils.printObject(data));
		})
		.catch(function(err)
		{
			stdout.log(err);
			return rlparam(linker, rl, key, ActionParams);
		});
}
