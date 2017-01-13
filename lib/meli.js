/**
 * Created with JetBrains WebStorm.
 * User: santiago
 * Date: 16/09/13
 * Time: 20:35
 * To change this template use File | Settings | File Templates.
 */


var needle = require('needle');

/**
 *
 * Creates a new object Meli
 *
 * @constructor
 * @param {string|number} client_id
 * @param {string} client_secret
 * @param {string} [access_token]
 * @param {string} [refresh_token]
 */
var config = require('../config.js').config;
var Meli = function (client_id, client_secret, access_token, refresh_token) {


   /**
     * Save the parameters in a private variable
     */
    var _parameters = {
        client_id: client_id,
        client_secret: client_secret,
        access_token: access_token,
        refresh_token: refresh_token
    };


    /**
     *
     * get the auth url.
     *
     * @param {string} redirect_uri
     * @returns {string}
     *
     */
    this.getAuthURL = function (redirect_uri) {

        var query = {
            response_type: 'code',
            client_id: _parameters.client_id,
            redirect_uri: redirect_uri
        };
        return config.auth_url + convertObjectToQueryString(query);

    };

    /**
     *
     * Exchange the code for a token
     *
     * @param {string} code
     * @param {string} redirect_uri
     * @param {function} callback function(error,response)
     *
     */
    this.authorize = function (code, redirect_uri, callback) {
        var self = this;
        needle.post(config.oauth_url, {
            grant_type: 'authorization_code',
            client_id: _parameters.client_id,
            client_secret: _parameters.client_secret,
            code: code,
            redirect_uri: redirect_uri
        }, {
        }, function (err, res, body) {
            if (body) {
                _parameters.access_token = body.access_token;
                _parameters.refresh_token = body.refresh_token;
                _parameters.redirect_uri = redirect_uri;
            }
            callback(err, body);
        });
    };
    /**
     *
     * Refresh your access token, using the token of the constructor or the token get in the Authorize method
     *
     * @param {function} callback function (error,response)
     */
    this.refreshAccessToken = function (callback) {
        var self = this;
        needle.post(config.oauth_url, {
            grant_type: 'refresh_token',
            client_id: _parameters.client_id,
            client_secret: _parameters.client_secret,
            refresh_token: _parameters.refresh_token
        }, {
        }, function (err, res, body) {
            if (body) {
                _parameters.refresh_token = body.refresh_token;
                _parameters.access_token = body.access_token;
            }
            callback(err, body);
        });
    };

    /**
     *
     * get request
     *
     * @param {string} path relative path to get
     * @param {object} [params] automatically add the access_token in the query
     * @param {function} callback function (error,response)
     */
    this.get = function (path, params, callback) {
        var cb = callback;
        if (!callback) cb = params;
        var query = (typeof(params) == 'object') ?
            convertObjectToQueryString(params) :
            convertObjectToQueryString({});


        path = config.api_root_url + (path.charAt(0) == '/' ? '' : '/') + path + query;
        //console.log(path);
        needle.get(path, {
        }, function (err, res, body) {
            //console.log(err, body);
            cb(err, res ? res.body : res);
        });
    };

    /**
     *
     * post request
     *
     * @param {string} path relative path to post
     * @param {object} body data to send to post, not require stringify
     * @param {object} [params] automatically add the access_token in the query
     * @param {function} callback function (error,response)
     */
    this.post = function (path, body, params, callback) {
        var cb = callback;
        if (!callback) cb = params;
        var query = (typeof(params) == 'object') ?
            convertObjectToQueryString(params) :
            convertObjectToQueryString({});

        path = config.api_root_url + (path.charAt(0) == '/' ? '' : '/') + path + query;
        //console.log(path);
        needle.post(path, body, {
            json: true,
            headers: {
                "Content-Type": "application/json"
            }
        }, function (err, res, body) {
            //console.log(err, body);

            cb(err, res ? res.body : res);
        });
    };

    /**
     *
     * post request (multipart)
     *
     * @param {string} path relative path to post
     * @param {object} body data to send to post, not require stringify
     * @param {object} [params] params automatically add the access_token in the query
     * @param {function} callback function (error,response)
     */
    this.upload = function (path, body, params, callback) {
        var cb = callback;
        if (!callback) cb = params;
        var query = (typeof(params) == 'object') ?
            convertObjectToQueryString(params) :
            convertObjectToQueryString({});

        path = config.api_root_url + (path.charAt(0) == '/' ? '' : '/') + path + query;
        //console.log(path);
        needle.post(path, body, {
            multipart: true
        }, function (err, res, body) {
            //console.log(err, body);

            cb(err, res ? res.body : res);
        });
    };

    /**
     *
     * put request
     *
     * @param {string} path relative path to put
     * @param {object} body data to send to put, not require stringify
     * @param {object} [params] params automatically add the access_token in the query
     * @param {function} callback function (error,response)
     */
    this.put = function (path, body, params, callback) {
        var cb = callback;
        if (!callback) cb = params;
        var query = (typeof(params) == 'object') ?
            convertObjectToQueryString(params) :
            convertObjectToQueryString({});

        path = config.api_root_url + (path.charAt(0) == '/' ? '' : '/') + path + query;
        //console.log(path);
        needle.put(path, body, {
            json: true,
            headers: {
                "Content-Type": "application/json"
            }
        }, function (err, res, body) {
            //console.log(err, body);

            cb(err, res ? res.body : res);
        });
    };

    /**
     *
     * delete request
     *
     * @param {string} path relative path to delete
     * @param {object} [params] params automatically add the access_token in the query
     * @param {function} callback function (error,response)
     */
    this.delete = function (path, params, callback) {
        var cb = callback;
        if (!callback) cb = params;
        var query = (typeof(params) == 'object') ?
            convertObjectToQueryString(params) :
            convertObjectToQueryString({});

        path = config.api_root_url + (path.charAt(0) == '/' ? '' : '/') + path + query;
        //console.log(path);
        needle.delete(path, {
            headers: {
                "Content-Type": "application/json"
            }
        }, function (err, res, body) {
            //console.log(err, body);

            cb(err, res ? res.body : res);
        });
    };

    /**
     *
     * @param {object} obj this object convert in query string, example: {a: 1, b: "hello"} ?a=1&b=hello
     * @returns {string}
     */
    var convertObjectToQueryString = function (obj) {
        // Clone the object obj and loose the reference
        obj = Object.create(obj);
        if (!obj.access_token && _parameters.access_token)
            obj.access_token = _parameters.access_token;
        var result = '?';
        for (var i in obj) {
            result += i + "=";
            if (obj[i] != undefined) {
                if (Array.isArray(obj[i])) {
                    result += obj[i].join() + "&";
                } else {
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