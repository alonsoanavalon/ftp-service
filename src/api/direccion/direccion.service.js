const direccionStorageService = require('./direccion.storageService')


exports.getAllDireccion = () => {
    return direccionStorageService.getAllDireccion();
}

exports.createDireccion = (direccion) => {
    return direccionStorageService.createDireccion(direccion);  
}

exports.getDireccionById = (id) => {
    return direccionStorageService.getDireccionById(id);   
}
