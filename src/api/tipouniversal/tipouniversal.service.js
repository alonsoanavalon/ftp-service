const tipoUniversalStorageService = require('./tipouniversal.storageService');

exports.getAllTipoUniversal = () => {
    return tipoUniversalStorageService.getAllTipoUniversal();
}

exports.getTipoUniversalById = (id) => {
    return tipoUniversalStorageService.getTipoUniversalById(id);

}

