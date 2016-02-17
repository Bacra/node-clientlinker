var debug	= require('debug')('client_linker:httpproxy');
var json	= require('../../lib/json');
var request	= require('request');

exports = module.exports = httpproxy;

function httpproxy(runtime, callback)
{
	var client = runtime.client;
	var options = client.options;
	if (!options.httpproxy) return callback.next();

	var url = options.httpproxy+'action='+runtime.methodKey;
	var body = {
		query		: runtime.query,
		body		: runtime.body,
		CONST_VARS	: json.CONST_VARS,
		runOptions	: runtime.runOptions
	};
	var headers = options.httpproxyHeaders || {};
	headers['Content-Type'] = 'application/json';
	var timeout = (runtime.runOptions && runtime.runOptions.timeout) || options.httpproxyTimeout;

	debug('request url:%s', url);

	request.post(
	{
		url			: url,
		body		: JSON.stringify(json.stringify(body)),
		headers		: headers,
		timeout		: timeout || 10000,
		proxy		: options.httpproxyProxy || process.env.http_proxy
	},
	function(err, respone, body)
	{
		if (!err && respone.statusCode != 200) err = 'respone!200,'+respone.statusCode;

		if (err)
		{
			debug('request err:%o', err);
			// proxy请求出错，自动转到下一个中间件
			return options.httpproxyErrorNext ? callback.next() : callback(err);
		}

		var data;
		try {
			data = JSON.parse(body);
		}
		catch(e)
		{
			return options.httpproxyErrorNext ? callback.next() : callback(e);
		}

		if (data.result)
			callback(data.result);
		else
		{
			data.data = json.parse(data.data, data.CONST_VARS);
			callback(null, data.data);
		}
	});
}

