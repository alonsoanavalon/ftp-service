const mysqlPool = require('../../database/database')

exports.getAllUsuario = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM usuario';

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
                    
                }
                try {
                    connection.query(sql, (err, result) => {
                        if (err) { 
                            console.error(err) 
                            mysqlPool.emit('error', err)
                            
                        }
                        connection.release(); // Importante liberar la conexión
                                if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
                    })
                } catch (error) {
                    mysqlPool.emit('error', err)
                    console.error(error);
                    ;
                }
      
            })
        } catch (error) {
            
            console.error(error.message)
            
        }
    })    
}

exports.createUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO usuario SET ?';

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
                    
                }
                try {
                    connection.query(sql, usuario, (err, result) => {
                        if (err) { 
                            console.error(err) 
                            mysqlPool.emit('error', err)
                            
                        }
                        connection.release(); // Importante liberar la conexión
                                if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
                    })
                } catch (error) {
                    mysqlPool.emit('error', err)
                    console.error(error);
                    ;
                }
      
            })
        } catch (error) {
            
            console.error(error.message)
        }
    })    
}

exports.getUsuarioById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM usuario WHERE id = ${id}`;

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
                    
                }
                try {
                    connection.query(sql, (err, result) => {
                        if (err) { 
                            console.error(err) 
                            mysqlPool.emit('error', err)
                            
                        }
                        connection.release(); // Importante liberar la conexión
                                if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
                    })
                } catch (error) {
                    mysqlPool.emit('error', err)
                    console.error(error);
                    ;
                }
      
            })
        } catch (error) {
            
            console.error(error.message)
            
        } 
    })    
}

exports.updateUsuario = (producto) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'UPDATE usuario SET codigo = ? , categoria_id = ? , tipouniversal_id = ?, SKU = ?, nombre = ?, precio = ?, marca = ?, descripcion = ?, cantidad = ?, imagen = ?, imagen_2 = ?, imagen_3 = ? WHERE id = ?';
            const dataProducto = [producto.codigo, producto.categoria_id, producto.tipouniversal_id, producto.SKU, producto.nombre, producto.precio, producto.marca, producto.descripcion, producto.cantidad, producto.imagen, producto.imagen_2, producto.imagen_3, producto.id]
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
    
                }
                try {
                    connection.query(sql, dataProducto, (err, result) => {
                        if (err) { 
                            console.error(err) 
                            mysqlPool.emit('error', err)

                        }
                        connection.release(); // Importante liberar la conexión
                                if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
                    })
                } catch (error) {
                    mysqlPool.emit('error', err)
                    console.error(error);
                }
      
            })
        } catch (error) {
            console.error(error.message)
        }
    })    
}
