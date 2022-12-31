const marcaStorageService = require('./marca.storageService')

exports.getAllMarca = () => {
    return marcaStorageService.getAllMarca();
}

exports.createMarca = (marca) => {
    return marcaStorageService.createMarca(marca); 
}

exports.getMarcaById = (id) => {
    return marcaStorageService.getMarcaById(id);  
}

exports.insertOrUpdate = (id, nombre) => {
    return marcaStorageService.insertOrUpdate(id, nombre);
}
