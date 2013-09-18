MercadoLibreNode
================

MercadoLibreNode SDK for Node.js

Install:  
`npm install mercadolibre`

Use:
```
var meli = require('mercadolibre');

var meliObject = new meli.Meli(client_id, client_secret, access_token, refresh_token);
```

meliObject.GetAuthURL(redirect_uri) 
meliObject.Authorize(code, redirect_uri, callback) 
meliObject.refreshAccessToken(callback) 
meliObject.get(path, params, callback) 
meliObject.post(path, body, params, callback) 
meliObject.put(path, body, params, callback) 
meliObject.delete(path, params, callback) 
       