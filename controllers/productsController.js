const axios = require('axios');
exports.getProducts = (req, res) => {
    const query = req.query.q;
    const url = `${process.env.API_PRODUCTS_GENERALS}?q=${query}`;
    axios.get(url)
        .then(response => {
            const data = response.data;
            console.log(data.results.slice(0,4))
            const categories = data.filters.find(filter => filter.id === 'category');
            const categoryValues = categories ?  categories?.values[0].path_from_root.map(category => category.name) : null ;

            const products = data.results.slice(0, 4).map(product => ({
                id: product.id,
                title: product.title,
                address: product.address.city_name,
                price: {
                    currency: product.currency_id,
                    amount: Math.floor(product.price),
                    decimals: Number((product.price % 1).toFixed(2))
                },
                picture: product.thumbnail,
                condition: product.condition,
                free_shipping: product.shipping.free_shipping
            }));
            const result = {
                author: {
                    name: 'Nicolas',
                    lastname: 'Monroy'
                },
                categories: categoryValues,
                products
            };
            res.json(result);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error en el servidor');
        });


}