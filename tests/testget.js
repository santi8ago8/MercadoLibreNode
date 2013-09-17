var meli = require('../index.js');


var meliObject = new meli.Meli();

meliObject.get('sites/MLA/categories', function (a, b, c) {
    console.log(a, b, c);
});