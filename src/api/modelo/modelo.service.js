const modeloStorageService = require('./modelo.storageService');


exports.getAllModelo = () => {
    return modeloStorageService.getAllModelo();
}

exports.createModelo = (modelo) => {
    return modeloStorageService.createModelo(modelo);    
}

exports.getModeloById = (id) => {
    return modeloStorageService.getModeloById(id); 
}

exports.insertOrUpdate = (id, id_marca, nombre) => {
    return modeloStorageService.insertOrUpdate(id, id_marca, nombre);
}
