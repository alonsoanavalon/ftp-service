const listaPedidoStorageService = require('./listapedido.storageService');


exports.getAllListaPedido = () => {
    return listaPedidoStorageService.getAllListaPedido();
}

exports.createListaPedido = (data) => {
    return listaPedidoStorageService.createListaPedido(data);    
}

exports.getListaPedidoById = (id) => {
    return listaPedidoStorageService.getListaPedidoById(id);  
}


