const metodoPagoStorageService = require('./metodopago.storageService');


exports.getAllMetodoPago = () => {
    return metodoPagoStorageService.getAllMetodoPago();
}

exports.createMetodoPago = (metodoPago) => {
    return metodoPagoStorageService.createMetodoPago(metodoPago);  
}

exports.getMetodoPagoById = (id) => {
    return metodoPagoStorageService.getMetodoPagoById(id); 
}

