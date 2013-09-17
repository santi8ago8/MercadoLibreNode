var meli = require('../index.js');


var meliObject = new meli.Meli();
/*
meliObject.get('sites/MLA/categories', function (a, b, c) {
    console.log(a, b, c);
});*/

meliObject.get('users/me', {
    access_token: 'APP_USR-6092-091714-0290c977f1dd4643e4a4c11ceb831053__H_B__-77169310'
}, function (a, b, c) {
    console.log(a, b, c);
});
