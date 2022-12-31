const submodeloStorageService = require('./submodelo.storageService');


exports.getAllSubmodelo = () => {
    return submodeloStorageService.getAllSubmodelo();
}

exports.createSubmodelo = (submodelo) => {
    return submodeloStorageService.createSubmodelo(submodelo);  
}

exports.getSubmodeloById = (id) => {
    return submodeloStorageService.getSubmodeloById(id);   
}

exports.insertOrUpdate = (id, id_modelo, nombre) => {
    return submodeloStorageService.insertOrUpdate(id, id_modelo, nombre);
}




