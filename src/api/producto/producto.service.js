const productoStorageService = require('./producto.storageService');

exports.getAllProducto = () => {
    return productoStorageService.getAllProducto();
}

exports.createProducto = (producto) => {
    return productoStorageService.createProducto(producto);   
}

exports.getProductoById = async (id) => {
    const product = await productoStorageService.getProductoById(id);   
    return product 
}

exports.getProductsByIds = async(products) => {

        let data = []

            let productos;
            try {
                productos = await productoStorageService.getProductosByIds(products)
                data.push(productos)
            } catch (error) {
                console.error(error)
            } 

        return data

}

exports.getProductsAmountsByIds = async(products, amounts) => {
    try {
        let data = []
        products.forEach(async (id, key) => {
            const product = await this.getProductoById(id);
            product[0]['cantidad_comprada'] = amounts[key]
            data.push(product[0])
        })
        return data
    } catch (error) {
        console.error(error);
    }

}

exports.updateProducto = (producto) => {
    return productoStorageService.updateProducto(producto);    
}

exports.getProductoInfoByListaSubmodelo = (listaSubmodeloId) => {
    return productoStorageService.getProductoInfoByListaSubmodelo(listaSubmodeloId);
}

exports.getProductosUniversal = () => { 
    return productoStorageService.getProductosUniversal();
}

exports.substractStock = (quantity, id) => {
    return productoStorageService.substractStock(quantity, id);
}

exports.getProductosAssociated = (id) => {
    return productoStorageService.getProductosAssociated(id);
}

exports.insertOrUpdate = (id, nombre, precio, cantidad, precio_local, descripcion) => {
    return productoStorageService.insertOrUpdate(id, nombre, precio, cantidad, precio_local, descripcion);
}