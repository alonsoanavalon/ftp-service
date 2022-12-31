const pedidoStorageService = require('./pedido.storageService');


exports.getAllPedido = () => {
    return pedidoStorageService.getAllPedido();
}

exports.createPedido = (pedido) => {
    return pedidoStorageService.createPedido(pedido);   
}

exports.getPedidoById = (id) => {
    return pedidoStorageService.getPedidoById(id);  
}

exports.updatePedido = (pedido) => {
    return pedidoStorageService.updatePedido(pedido);   
}

exports.getPedidosFormat = () => {
    return pedidoStorageService.getPedidosFormat();
}

exports.getPedidoFormatById = (pedidoId) => {
    return pedidoStorageService.getPedidoFormatById(pedidoId);
}

exports.cambiarEstadoPedido = (pedidoId, estadoId) => {
    return pedidoStorageService.cambiarEstadoPedido(pedidoId, estadoId)
}

exports.getListaPedidoAssociated = (id) => {
    return pedidoStorageService.getListaPedidoAssociated(id);
}

