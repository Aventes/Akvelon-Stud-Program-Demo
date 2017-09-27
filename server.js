const express = require('express');
const testProducts = require('./src/testData/index.json');
const cors = require('cors');

const app = express()
    , bodyParser = require('body-parser');
const router = express.Router();

const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.json({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.options('*', cors());

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// middleware to use for all requests
router.use(function (req, res, next) {
    res.header("Content-Type", 'application/json');
    res.header("Access-Control-Allow-Origin", "*");

    console.log(`URL: http://${hostname}:${port}/${req.url}, method:${req.method}, data:`, req.body);
    next(); // make sure we go to the next routes and don't stop here
});

/** Index page Endpoint
 * GET / - home page
 */
router.get('/', function (req, res) {
    res.json({message: "Welcome to index.html page!"});
});

/** Product list endpoints */

const ProductList = {
    products: testProducts,
    getAll: () => ProductList.products,
    push: (product) => {
        if (!product) {
            throw new Error("Product is undefined");
        }
        ProductList.products.push(product);

        return ProductList.products;
    },
    removeProductById: (productId) => {
        if (!productId) return null;

        let newProducts = ProductList.products.filter((product) => product.id !== parseInt(productId));
        if(Array.isArray(newProducts)) {
            ProductList.products = newProducts.slice(0);
            return ProductList.products;
        }

        return null;
    },
    replaceOne: (product) => {
        if(!product) {
            throw new Error("Product is undefined");
        }
        let products = ProductList.removeProductById(product.id);
        if(products) {
            ProductList.push(product);

            return ProductList.getAll();
        }

        return null;
    },
    filterBy: (productId) => productId ? ProductList.products.filter((product) => product.id === parseInt(productId)) : null,
    findBy: (productId) => productId ? ProductList.products.find(p => p.id === parseInt(productId)) : null
};

/**Get All Products Endpoint
 *  GET /products
 */
app.get('/products', function (req, res) {
    res.json(ProductList.getAll());
});

/**Create a specific Product Endpoint
 *  POST /products
 */
app.post('/products', function (req, res) {
    debugger;
    let product = req.body.product;

    if (product) {
        let newProduct = Object.assign(product, {
            id: ProductList.getAll().length + 1,
            name: product.name,
            price: parseFloat(product.price),
            addedToCart: false
        });
        ProductList.push(newProduct);

        res.json({products: ProductList.getAll(), status: 'SUCCESS'});
    } else {
        res.json({status: 'ERROR. Body is empty'});
    }
});

/**Delete specific Product Endpoint
 *  DELETE /products/:productId
 */
app.delete('/products/:productId', function (req, res) {
    let productId = req.params.productId;

    if (!ProductList.findBy(productId)) {
        res.json({status: 'ERROR. SUCH productId is not found, ' + productId});
        return false;
    }

    let products = ProductList.removeProductById(productId);
    if (products) {
        res.json({status: 'SUCCESS', products: products});
    } else {
        res.json({status: 'ERROR. SUCH productId is not found, ' + productId});
    }
});

/** Get specific Product Endpoint
 *   GET /products/:productId
 */
app.get('/products/:productId', function (req, res) {
    let productId = req.params.productId;

    let foundProduct = ProductList.findBy(productId);
    if (!foundProduct) {
        res.json({status: 'ERROR. SUCH productId is not found, ' + productId});
        return false;
    }

    if (foundProduct) {
        res.json({product: foundProduct});
    } else {
        res.json({status: 'ERROR. SUCH productId is not found, ' + productId});
    }
});

/**Edit Product Endpoint
 *  PUT /products/:productId
 */
app.put('/products/:productId', function (req, res) {
    let productId = req.params.productId;

    if (!ProductList.findBy(productId)) {
        res.json({status: 'ERROR. SUCH productId is not found, ' + productId});
        return false;
    }

    let products = ProductList.replaceOne(req.body.product);
    if (products) {
        res.json({status: "SUCCESS", products: products});
    } else {
        res.json({status: 'ERROR. SUCH productId is not found, ' + productId});
    }
});


/** Shopping Cart Endpoints*/
const ShoppingCart = {
    products: testProducts.filter((product) => product.addedToCart),
    getAll: () => ShoppingCart.products,
    checkout: () => ShoppingCart.products.length = 0, //clean array
    addToCart: (productId) =>{
        let product = ProductList.findBy(productId);
        if (!product) {
            throw new Error("Product is undefined");
        }
        ShoppingCart.products.push(product);

        return ShoppingCart.products;
    },
    removeFromCart: (productId) => {
        if (!productId) {
            throw new Error("ProductId is undefined");
        }
        ShoppingCart.products = ShoppingCart.products.filter((product) => product.id !== parseInt(productId));

        return ShoppingCart.products;
    }
};

/**Get All Cart Products Endpoint
 *  GET /cart/products
 */
app.get('/cart/products', function (req, res) {
    res.json(ShoppingCart.getAll());
});

/**Shopping Cart Checkpout
 * POST /cart/checkout
 */
app.post('/cart/checkout', function(req, res) {
    ShoppingCart.checkout();

    res.json({status: 'SUCCESS'})
})

/**Add product to Cart Endpoint
 *  PUT /cart/:productId
 */
app.put('/cart/:productId', function (req, res) {
    let productId = req.params.productId;

    if (!ProductList.findBy(productId)) {
        res.json({status: 'ERROR. SUCH productId is not found, ' + productId});
        return false;
    }

    let products = ShoppingCart.addToCart(productId);
    if (products) {
        res.json({status: "SUCCESS", products: products});
    } else {
        res.json({status: 'ERROR. SUCH productId is not found, ' + productId});
    }
});

/**Remove product from Cart Endpoint
 *  DELETE /cart/:productId
 */
app.delete('/cart/:productId', function (req, res) {
    let productId = req.params.productId;

    if (!ProductList.findBy(productId)) {
        res.json({status: 'ERROR. SUCH productId is not found, ' + productId});
        return false;
    }

    let products = ShoppingCart.removeFromCart(productId);
    if (products) {
        res.json({status: "SUCCESS", products: products});
    } else {
        res.json({status: 'ERROR. SUCH productId is not found, ' + productId});
    }
});