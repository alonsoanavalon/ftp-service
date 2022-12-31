const clientesStorageService = require('./clientes.storageService')

exports.getAllClientes = () => {
    return clientesStorageService.getAllClientes();
}

exports.createCliente = (cliente) => {
    return clientesStorageService.createCliente(cliente);   
}

exports.getClienteById = (id) => {
    return clientesStorageService.getClienteById(id); 
}

exports.updateCliente = (cliente) => {
    return clientesStorageService.updateCliente(cliente);
}

exports.clienteByFilter = async (email, phone, rut) => {
    const cliente = await clientesStorageService.clienteByFilter(email, phone, rut);
    if (cliente.length > 0) {
        const clienteId = cliente[0]['id'];
        return clienteId
    } else {
        return null
    }
    
}