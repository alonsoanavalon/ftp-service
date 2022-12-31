const regionStorageService = require('./region.storageService');


exports.getAllRegion = () => {
    return regionStorageService.getAllRegion();
}

exports.getRegionById = (id) => {
    return regionStorageService.getRegionById(id);   
}