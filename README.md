MercadoLibreNode
================

MercadoLibreNode SDK for Node.js

Install:  
`npm install mercadolibre`

Use require:
```
var meli = require('mercadolibre');
```
constructor:
```
var meliObject = new meli.Meli(client_id, client_secret, [access_token], [refresh_token]);
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
|client_id|int|yes|ID provided when creating a MELI APP (link to create app guide)|
|client_secret|	string|	yes|	Hash string key provided when creating a MELI APP (link to create app guide)|
|access_token	|string|	optional|	Used to talk to our API resources that require credentials (eg: POST to /items).|
|refresh_token|	string|	optional|	Hash string provided when a user authorizes an A P. Used to get a new valid access_token (only available when offline_access scope in APP settings is checked).|

meliObject.GetAuthURL(redirect_uri) 
meliObject.Authorize(code, redirect_uri, callback) 
meliObject.refreshAccessToken(callback) 
meliObject.get(path, [params,] callback) 
meliObject.post(path, body, [params,] callback) 
meliObject.put(path, body, [params,] callback) 
meliObject.delete(path, [params,] callback) 
```       
The callback function, in all cases receives the parameters:
```
var exampleCallback = function(error, response){

}
```