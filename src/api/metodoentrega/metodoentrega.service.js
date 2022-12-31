const metodoEntregaStorageService = require('./metodoentrega.storageService');

exports.getAllMetodoEntrega = () => {
    return metodoEntregaStorageService.getAllMetodoEntrega();
}

exports.createMetodoEntrega = (metodoEntrega) => {
    return metodoEntregaStorageService.createMarca(metodoEntrega);
}

exports.getMetodoEntregaById = (id) => {
    return metodoEntregaStorageService.getMetodoEntregaById(id);
}

