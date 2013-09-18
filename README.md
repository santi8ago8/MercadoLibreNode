MercadoLibreNode
================

MercadoLibreNode SDK for Node.js

### Install  
`npm install mercadolibre`
### Use
#### require:
```
var meli = require('mercadolibre');
```
####Constructor:
```
var meliObject = new meli.Meli(client_id, client_secret, [access_token], [refresh_token]);
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
|client_id|int|yes|ID provided when creating a MELI APP (link to create app guide)|
|client_secret|	string|	yes|	Hash string key provided when creating a MELI APP (link to create app guide)|
|access_token	|string|	optional|	Used to talk to our API resources that require credentials (eg: POST to /items).|
|refresh_token|	string|	optional|	Hash string provided when a user authorizes an A P. Used to get a new valid access_token (only available when offline_access scope in APP settings is checked).|
### Authorization methods
#### getAuthURL
```
meliObject.getAuthURL(redirect_uri) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
redirect_uri|string|yes|Callback URL to which the user will be redirected after granting permission to the Meli APP. The code required to obtain the first access_token (required in Authorize method) will be appended to this URL when making this redirect.|
#### authorize
```
meliObject.authorize(code, redirect_uri, callback) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
code|string|yes|Code received at redirect_uri when user granted permission to the Meli APP.|
redirect_uri|string|yes|Callback URL to which the API will send the access & refresh tokens. Must be the same as the one configured in the Meli APP settings.|
callback|function|yes|Callback function is executed when the task is completed 
#### refreshAccessToken
```
meliObject.refreshAccessToken(callback) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
callback|function|yes|Callback function is executed when the task is completed 
### Request methods
#### get
```
meliObject.get(path, [params,] callback) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the GET request will be sent to.|
params|object|optional|Additional params (if required).|
callback|function|yes|Callback function is executed when the task is completed|
#### post
```
meliObject.post(path, body, [params,] callback) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the GET request will be sent to.|
body|object|yes|Body to be sent when executing the POST request.
params|object|optional|Additional params (if required).|
callback|function|yes|Callback function is executed when the task is completed|
#### put
```
meliObject.put(path, body, [params,] callback) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the GET request will be sent to.|
body|object|yes|Body to be sent when executing the POST request.
params|object|optional|Additional params (if required).|
callback|function|yes|Callback function is executed when the task is completed|
#### delete
```
meliObject.delete(path, [params,] callback) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the GET request will be sent to.|
params|object|optional|Additional params (if required).|
callback|function|yes|Callback function is executed when the task is completed|

#### Details necessary
The callback function, in all cases receives the parameters:
```
var exampleCallback = function(error, response){ }
```
The object passed in the params parameter in functions get, post, put and delete. Is automatically converted to a query string  
Example:
```
meliObject.get('/users/',{ids:[77169310,1231233]}, function (a,b) {})
```
The request is get ​​to the following address:
```
https://api.mercadolibre.com/users/?ids=77169310,1231233
```