const estadoStorageService = require('./estado.storageService');

exports.getAllEstado = () => {
    return estadoStorageService.getAllEstado();    
}

exports.getEstadoById = (id) => {
    return estadoStorageService.getEstadoById(id);
}

exports.updateDireccion = (cliente) => {
    return estadoStorageService.updateDireccion(cliente);  
}
