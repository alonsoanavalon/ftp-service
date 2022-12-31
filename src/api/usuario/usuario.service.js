const usuarioStorageService = require('./usuario.storageService');

exports.getAllUsuario = () => {
    return usuarioStorageService.getAllUsuario();
}

/* exports.createUsuario = (usuario) => {
    return usuarioStorageService.createUsuario(usuario);
} */

exports.getUsuarioById = (id) => {
    return usuarioStorageService.getUsuarioById(id); 
}

/* exports.updateUsuario = (usuario) => {
    return usuarioStorageService.getAllUsuario(usuario);
} */
