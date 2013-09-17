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

        var ret = "%sauthorization?response_type=%s&client_id=%s&redirect_uri=%s";

        return util.format(ret, config.auth_url, 'code', client_id, redirect_uri);

    };

    this.Authorize = function (code, redirect_uri, callback) {

    };

    this.refreshAccessToken = function () {

    };

    this.get = function (path, params, callback) {
        var cb = callback;
        if (!callback) cb = params;
        var query = (typeof(params) == 'object') ? convertObjectToQueryString(params) : '';


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
        var query = (typeof(params) == 'object') ? convertObjectToQueryString(params) : '';

        path = config.api_root_url + path + query;
        console.log(path);
        needle.post(path, body, {secureProtocol: "SSLv3_method"}, function (err, res, body) {
            //console.log(err, body);

            cb(err, res ? res.body : res);
        });
    };

    this.put = function (path, body, params, callback) {

    };

    this.delete = function (path, body, callback) {

    };

    var convertObjectToQueryString = function (obj) {
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