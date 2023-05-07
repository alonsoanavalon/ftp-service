const mysqlPool = require('../../database/database')


exports.getAllPedido = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM pedido';

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        
                    }
                    connection.release(); // Importante liberar la conexión
                            if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
                })
            })

        } catch (error) {
            
            console.error(error.message);
        }
    })    
}

exports.createPedido = async (pedido) => {
    return await new Promise((resolve) => {
        try {
            const sql = 'INSERT INTO pedido SET ?';


            mysqlPool.getConnection((err, connection) => {
                if (err) {
                    console.error(err);
                    mysqlPool.emit('error', err)
                }
                connection.query(sql, pedido, (error, result) => {
                    if (error) {
                        console.error(error.message);
                        mysqlPool.emit('error', err)
                    }
                    connection.release();
                    resolve(result)
  
                });
            });



        } catch (error) {
            mysqlPool.emit('error', err)
            console.error(error.message)
        }
    })    
}

exports.getPedidoById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM pedido WHERE id = ${id}`;
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        
                    }
                    connection.release(); // Importante liberar la conexión
                            if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
                })
            })
        } catch (error) {
            
            console.error(error.message);
        } 
    })    
}

exports.updatePedido = (pedido) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'UPDATE pedido SET cliente_id = ?, metodopago_id = ?, tipodocumento_id = ?, estado_id = ?, metodoentrega_id = ?, fecha = ?, receptor = ?, pedido = ?, precio = ?, direccion = ?  WHERE id = ?';
            const dataPedido = [pedido.cliente_id, pedido.metodopago_id, pedido.tipodocumento_id, pedido.estado_id, pedido.metodoentrega_id, pedido.fecha, pedido.receptor, pedido.pedido, pedido.precio, pedido.direccion, pedido.id]
            mysqlPool.getConnection((err, connection) => {
                if (err) {
                    console.error(err);
                    ;
                }
                connection.query(sql, dataPedido, (error, result) => {
                    if (error) {
                        console.error(error.message);
                        ;
                    }
                    connection.release();
                    resolve(result);
                });
            });
        } catch (error) {
            
            console.error(error.message)
        }
    })    
}

exports.getPedidosFormat = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = "SELECT pedido.id, cliente.nombre, metodopago.pago, pedido.precio, pedido.direccion, pedido.receptor, pedido.fecha, tipodocumento.documento, pedido.estado_id FROM pedido INNER JOIN cliente on cliente.id = pedido.cliente_id INNER JOIN metodopago on metodopago.id = pedido.metodopago_id INNER JOIN tipodocumento on tipodocumento.id = pedido.tipodocumento_id order by id desc;"
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        
                    }
                    connection.release(); // Importante liberar la conexión
                            if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
                })
            })
        } catch (error) {
            
            console.error(error.message)
            
        }
    })    
}

exports.cambiarEstadoPedido = (pedidoId, estadoId) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `UPDATE pedido SET estado_id = ${estadoId} where id = ${pedidoId};`
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        
                    }
                    connection.release(); // Importante liberar la conexión
                            if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
                })
            })
        } catch (error) {
            
            console.error(error.message)
            
        }
    })    

}

exports.getPedidoFormatById = (pedidoId) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT pedido.id, cliente.email, cliente.nombre, metodopago.pago, pedido.precio, pedido.direccion, pedido.receptor, pedido.fecha, tipodocumento.documento, pedido.estado_id FROM pedido INNER JOIN cliente on cliente.id = pedido.cliente_id INNER JOIN metodopago on metodopago.id = pedido.metodopago_id INNER JOIN tipodocumento on tipodocumento.id = pedido.tipodocumento_id WHERE pedido.id = ${pedidoId}`
            
            
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result))[0])
                })
            })
            
        } catch (error) {
            
            console.error(error.message)
            
        }
    })    
}

exports.getListaPedidoAssociated = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT producto_id, cantidad FROM listapedido WHERE listapedido.pedido_id = ${id}`;
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        
                    }
                    connection.release(); // Importante liberar la conexión
                            if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
                })
            })
        } catch (error) {
            
            console.error(error.message)
            
        }
    })    
}

exports.getProductosAssociated = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT producto_id, cantidad FROM listapedido WHERE listapedido.pedido_id = ${id}`;
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        
                    }
                    connection.release(); // Importante liberar la conexión
                            if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
                })
            })
        } catch (error) {
            
            console.error(error.message)
            
        }
    })  
}
