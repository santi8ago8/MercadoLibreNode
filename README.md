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
#### Constructor:
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
returns `string`
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
##### Examples
```
//Get categories from mercado libre argentina
meliObject.get('sites/MLA/categories', function (err, res) {
    console.log(err, res);
    /** returns:
		err = null
		res = [ 
				{ id: 'MLA5725', name: 'Accesorios para Vehículos' },
				{ id: 'MLA1071', name: 'Animales y Mascotas' },
				{ id: 'MLA1367', name: 'Antigüedades' },
				{ id: 'MLA1368', name: 'Arte y Artesanías' },
				{ id: 'MLA1743', name: 'Autos, Motos y Otros' },
				{ id: 'MLA1384', name: 'Bebés' },
				...
			]
	*/
});
//Get users with ids 145925943 and 145925951
meliObject.get('users', {
    ids: [145925943, 145925951]
}, function (err, res) {
    console.log(err, res);
   /** returns:
		err = null
		res = [ 
				{ 
					id: 145925943,
				    nickname: 'TETE2780570',
				    registration_date: '2013-09-17T14:20:30.000-04:00',
				    country_id: 'AR',
				    address: { state: 'AR-C', city: 'Palermo' },
				    user_type: 'normal',
				    tags: [ 'normal', 'test_user', 'user_info_verified' ],
				    logo: null,
				    points: 100,
				    site_id: 'MLA',
				    permalink: 'http://perfil.mercadolibre.com.ar/TETE2780570',
				    seller_reputation:
				     { level_id: null,
				       power_seller_status: null,
				       transactions: [Object] },
				    buyer_reputation: { tags: [] },
				    status: { site_status: 'deactive' } 
				},
				{
					id: 145925951,
				    nickname: 'TETE1341752',
				    registration_date: '2013-09-17T14:20:43.000-04:00',
				    country_id: 'AR',
				    address: { state: 'AR-C', city: 'Palermo' },
				    user_type: 'normal',
				    tags: [ 'normal', 'test_user', 'user_info_verified' ],
				    logo: null,
				    points: 100,
				    site_id: 'MLA',
				    permalink: 'http://perfil.mercadolibre.com.ar/TETE1341752',
				    seller_reputation:
				     { level_id: null,
				       power_seller_status: null,
				       transactions: [Object] },
				    buyer_reputation: { tags: [] },
				    status: { site_status: 'deactive' } 
				}
			]
	*/
});
```
#### post
```
meliObject.post(path, body, [params,] callback) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the POST request will be sent to.|
body|object|yes|Body to be sent when executing the POST request.
params|object|optional|Additional params (if required).|
callback|function|yes|Callback function is executed when the task is completed|
#### upload (post with multipart)
```
meliObject.upload(path, body, [params,] callback) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the POST request will be sent to.|
body|object|yes|Body to be sent when executing the POST request.
params|object|optional|Additional params (if required).|
callback|function|yes|Callback function is executed when the task is completed|
#### put
```
meliObject.put(path, body, [params,] callback) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the PUT request will be sent to.|
body|object|yes|Body to be sent when executing the PUT request.
params|object|optional|Additional params (if required).|
callback|function|yes|Callback function is executed when the task is completed|
#### delete
```
meliObject.delete(path, [params,] callback) 
```
|Field|Type|Required|Description|
|-----|----|--------|-----------|
path|string|yes|API resource path to which the DELETE request will be sent to.|
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
meliObject.get('/users/', {ids: [77169310, 1231233]}, function(a,b) { })
```
The request is get ​​to the following address:
```
https://api.mercadolibre.com/users/?ids=77169310,1231233
```