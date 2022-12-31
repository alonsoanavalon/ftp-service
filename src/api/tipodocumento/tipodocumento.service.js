const tipoDocumentoStorageService = require('./tipodocumento.storageService');


exports.getAllTipoDocumento = () => {
    return tipoDocumentoStorageService.getAllTipoDocumento();    
}

exports.getTipoDocumentoById = (id) => {
    return tipoDocumentoStorageService.getTipoDocumentoById(id);     
}

