import fs from 'fs/promises';

class ProductManager {
    constructor (filePath) {
        this.path = filePath;
    }

    async getProducts () {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
        return []
        }  
    }

    async getProductById (id) {
        const products = await this.getProducts();
        return products.find(product => product.id === id) || null;
    }


    async addProduct({ title, description, price, thumbnail, code, stock }) {
        const products = await this.getProducts();

        if (products.some(product => product.code === code)) {
            throw new Error('El codigo ya existe');
        }

        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }



}

export default ProductManager;