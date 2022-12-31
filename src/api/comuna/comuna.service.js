const comunaStorageService = require('./comuna.storageService')


exports.getAllComuna = () => {
    return comunaStorageService.getAllComuna();
}

exports.createComuna = (comuna) => {
    return comunaStorageService.createComuna(comuna);
}

exports.getComunaById = (id) => {
    return comunaStorageService.getComunaById(id);
}

exports.updateCliente = (cliente) => {
    return comunaStorageService.updateCliente(cliente); 
}
