const tipoClienteStorageService = require('./tipocliente.storageService');

exports.getAllTipoCliente = () => {
    return tipoClienteStorageService.getAllTipoCliente();
}

exports.getTipoClienteById = (id) => {
    return tipoClienteStorageService.getTipoClienteById(id); 
}

