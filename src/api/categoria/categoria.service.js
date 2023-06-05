const categoriaStorageService = require('./categoria.storageService')

exports.getAllCategoria = () => {
    return categoriaStorageService.getAllCategoria();
}

exports.createCategoria = (categoria) => {
    return categoriaStorageService.createCategoria(categoria);
}

exports.getCategoriaById = (id) => {
    return categoriaStorageService.getCategoriaById(id);
}

exports.updateCategoria = (categoria) => {
    return categoriaStorageService.updateCategoria(categoria);
}

exports.insertOrUpdate = (id, nombreCategoria) => {
    return categoriaStorageService.insertOrUpdate(id, nombreCategoria);
}