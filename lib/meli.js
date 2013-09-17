/**
 * Created with JetBrains WebStorm.
 * User: santiago
 * Date: 16/09/13
 * Time: 20:35
 * To change this template use File | Settings | File Templates.
 */

var util = require('util');
var needle = require('needle');
var config = require('../config.js').config;


var Meli = function (client_id, client_secret, access_token, refresh_token) {


    this.GetAuthURL = function (redirect_uri) {

        var query = {
            response_type: 'code',
            client_id: client_id,
            redirect_uri: redirect_uri
        };
        return config.auth_url + convertObjectToQueryString(query);

    };

    this.Authorize = function (code, redirect_uri, callback) {
        var self = this;
        needle.post(config.oauth_url, {
            grant_type: 'authorization_code',
            client_id: client_id,
            client_secret: client_secret,
            code: code,
            redirect_uri: redirect_uri
        }, {secureProtocol: "SSLv3_method"}, function (err, res, body) {
            if (body) {
                self.code = body.refresh_token;
                self.redirect_uri = redirect_uri;
            }
            callback(err, body);
        });
    };

    this.refreshAccessToken = function (callback) {
        var self = this;
        needle.post(config.oauth_url, {
            grant_type: 'refresh_token',
            client_id: client_id,
            client_secret: client_secret,
            refresh_token: this.code,
            redirect_uri: this.redirect_uri
        }, {secureProtocol: "SSLv3_method"}, function (err, res, body) {
            if (body) {
                self.code = body.refresh_token;
            }
            callback(err, body);
        });
    };

    this.get = function (path, params, callback) {
        var cb = callback;
        if (!callback) cb = params;
        var query = (typeof(params) == 'object') ?
            convertObjectToQueryString(params) :
            convertObjectToQueryString({});


        path = config.api_root_url + path + query;
        console.log(path);
        needle.get(path, {secureProtocol: "SSLv3_method"}, function (err, res, body) {
            //console.log(err, body);
            cb(err, res ? res.body : res);
        });
    };

    this.post = function (path, body, params, callback) {
        var cb = callback;
        if (!callback) cb = params;
        var query = (typeof(params) == 'object') ?
            convertObjectToQueryString(params) :
            convertObjectToQueryString({});

        path = config.api_root_url + path + query;
        console.log(path);
        needle.post(path, JSON.stringify(body), {
            secureProtocol: "SSLv3_method",
            headers: { "Content-Type": "application/json" }
        }, function (err, res, body) {
            //console.log(err, body);

            cb(err, res ? res.body : res);
        });
    };

    this.put = function (path, body, params, callback) {
        var cb = callback;
        if (!callback) cb = params;
        var query = (typeof(params) == 'object') ?
            convertObjectToQueryString(params) :
            convertObjectToQueryString({});

        path = config.api_root_url + path + query;
        console.log(path);
        needle.put(path, JSON.stringify(body), {
            secureProtocol: "SSLv3_method",
            headers: { "Content-Type": "application/json" }
        }, function (err, res, body) {
            //console.log(err, body);

            cb(err, res ? res.body : res);
        });
    };

    this.delete = function (path, params, callback) {
        var cb = callback;
        if (!callback) cb = params;
        var query = (typeof(params) == 'object') ?
            convertObjectToQueryString(params) :
            convertObjectToQueryString({});

        path = config.api_root_url + path + query;
        console.log(path);
        needle.delete(path, {
            secureProtocol: "SSLv3_method",
            headers: { "Content-Type": "application/json" }
        }, function (err, res, body) {
            //console.log(err, body);

            cb(err, res ? res.body : res);
        });
    };

    var convertObjectToQueryString = function (obj) {
        if (!obj.access_token)
            obj.access_token = access_token;
        var result = '?';
        for (var i in obj) {
            result += i + "=";
            if (obj[i] != undefined) {
                if (Array.isArray(obj[i])) {
                    result += obj[i].join() + "&";
                }
                else {
                    result += obj[i] + "&";
                }
            }
        }
        if (result[result.length - 1] == '&') {
            result = result.substr(0, result.length - 1);
        }
        if (result == '?')
            result = '';
        return result;
    }

};


exports.Meli = Meli;