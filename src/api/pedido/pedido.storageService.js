const mysqlConnection = require('../../database/database')


exports.getAllPedido = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM pedido';
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(JSON.parse(JSON.stringify(result)))
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        }
    })    
}

exports.createPedido = (pedido) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO pedido SET ?';
            mysqlConnection.query(sql, pedido, (error, result) => {
                if (error) {
                    console.log(error.message);
                    resolve(error)
                }
                resolve(result)
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
        }
    })    
}

exports.getPedidoById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM pedido WHERE id = ${id}`;
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(result)
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        } 
    })    
}

exports.updatePedido = (pedido) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'UPDATE pedido SET cliente_id = ?, metodopago_id = ?, tipodocumento_id = ?, estado_id = ?, metodoentrega_id = ?, fecha = ?, receptor = ?, pedido = ?, precio = ?, direccion = ?  WHERE id = ?';
            const dataPedido = [pedido.cliente_id, pedido.metodopago_id, pedido.tipodocumento_id, pedido.estado_id, pedido.metodoentrega_id, pedido.fecha, pedido.receptor, pedido.pedido, pedido.precio, pedido.direccion, pedido.id]
            mysqlConnection.query(sql, dataPedido, (error, result) => {
                if (error) {
                    console.log(error.message);
                    resolve(error)
                }
                resolve(result)
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
        }
    })    
}

exports.getPedidosFormat = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = "SELECT pedido.id, cliente.nombre, metodopago.pago, pedido.precio, pedido.direccion, pedido.receptor, pedido.fecha, tipodocumento.documento, pedido.estado_id FROM pedido INNER JOIN cliente on cliente.id = pedido.cliente_id INNER JOIN metodopago on metodopago.id = pedido.metodopago_id INNER JOIN tipodocumento on tipodocumento.id = pedido.tipodocumento_id order by id desc;"
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(JSON.parse(JSON.stringify(result)))
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        }
    })    
}

exports.cambiarEstadoPedido = (pedidoId, estadoId) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `UPDATE pedido SET estado_id = ${estadoId} where id = ${pedidoId};`
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(JSON.parse(JSON.stringify(result)))
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        }
    })    

}

exports.getPedidoFormatById = (pedidoId) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT pedido.id, cliente.email, cliente.nombre, metodopago.pago, pedido.precio, pedido.direccion, pedido.receptor, pedido.fecha, tipodocumento.documento, pedido.estado_id FROM pedido INNER JOIN cliente on cliente.id = pedido.cliente_id INNER JOIN metodopago on metodopago.id = pedido.metodopago_id INNER JOIN tipodocumento on tipodocumento.id = pedido.tipodocumento_id WHERE pedido.id = ${pedidoId}`
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                const selectedPedido = JSON.parse(JSON.stringify(result))
                resolve(selectedPedido[0])
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        }
    })    
}

exports.getListaPedidoAssociated = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT producto_id, cantidad FROM listapedido WHERE listapedido.pedido_id = ${id}`;
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(JSON.parse(JSON.stringify(result)))
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        }
    })    
}

exports.getProductosAssociated = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT producto_id, cantidad FROM listapedido WHERE listapedido.pedido_id = ${id}`;
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(JSON.parse(JSON.stringify(result)))
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        }
    })  
}
