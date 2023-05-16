const axios = require('axios');

exports.getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const productResponse = await axios.get(`${process.env.API_PRODUCT}/${productId}`);
        const productData = productResponse.data;
        const descReponse = await axios.get(`${process.env.API_PRODUCT}/${productId}/description`);
        const descData = descReponse.data;
        const response = {
            author: {
                name: 'Nicolas',
                lastname: 'Monroy',
            },
            product: {
                id: productData.id,
                title: productData.title,
                price: {
                    currency: productData.currency_id,
                    amount: Math.floor(productData.price),
                    decimals: Number((productData.price % 1).toFixed(2))
                },
                picture: productData.thumbnail,
                condition: productData.condition,
                free_shipping: productData.shipping.free_shipping,
                sold_quantity: productData.sold_quantity,
                description: descData.plain_text

            }
        };
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
}