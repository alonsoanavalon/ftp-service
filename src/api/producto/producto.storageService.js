const mysqlPool = require('../../database/database')


exports.getAllProducto = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'select * from producto WHERE estado="A"';
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

exports.createProducto = (producto) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO producto SET ?';
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
                    
                }
                try {
                    connection.query(sql, producto, (err, result) => {
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

exports.getProductosByIds = (ids) => {
    const itemsString = JSON.stringify(ids);
    const parseandoItems = itemsString.replace("[", "")
    const productos = parseandoItems.replace("]", "").split(",")


    return new Promise(async (resolve, reject) => {
        try {
            const sql = `SELECT * FROM producto WHERE id IN(${productos}) AND estado="A";`;
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

exports.getProductoById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `SELECT * FROM producto WHERE id = '${id}' AND estado="A";`;
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

exports.updateProducto = (producto) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'UPDATE producto SET imagen = ?, imagen_2 = ?, imagen_3 = ? WHERE id = ?';
            const dataProducto = [producto.imagen, producto.imagen_2, producto.imagen_3, `${producto.id}`]
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
                    ;
                }
      
            })
        } catch (error) {
            
            console.error(error.message)
        }
    })    
}


exports.getProductoInfoByListaSubmodelo = (listaSubmodeloId) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT producto.cantidad, tipouniversal_id, producto.id, producto.imagen, producto.precio, producto.nombre, producto.SKU, producto.marca FROM listaproducto INNER JOIN producto ON producto.id = listaproducto.producto_id
            INNER JOIN listasubmodelo ON listasubmodelo.id = listaproducto.listasubmodelo_id WHERE listasubmodelo.id = ${listaSubmodeloId} AND producto.cantidad >= 0 AND producto.estado="A" AND NOT producto.tipouniversal_id = 1`;

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
            console.error(error.message);
        }
    })
}

exports.getProductosUniversal = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT producto.cantidad, tipouniversal_id, producto.id, producto.imagen, producto.precio, producto.nombre, producto.SKU, producto.marca FROM producto WHERE tipouniversal_id = 1 AND producto.cantidad >= 0 AND producto.estado="A";`;

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
            console.error(error.message);
        }
    })
}

exports.getProductosAssociated = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT producto_id, cantidad FROM listapedido WHERE listapedido.pedido_id = ${id}`;
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

exports.substractStock = (quantity, id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `UPDATE producto SET cantidad = (producto.cantidad - ${quantity}) where id = '${id}'; `;
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

exports.insertOrUpdate = (id, nombre, precio, cantidad, precio_local, descripcion, estado, idFamilia) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `INSERT INTO producto (id, codigo, SKU, nombre, precio, cantidad, precio_local, descripcion, estado, categoria_id) VALUES('${id}','${id}','${id}','${nombre}',${precio}, ${cantidad}, ${precio_local}, '${descripcion}', '${estado}', ${idFamilia}) ON DUPLICATE KEY UPDATE codigo='${id}',SKU='${id}', nombre='${nombre}', precio=${precio}, cantidad =${cantidad}, precio_local =${precio_local}, descripcion = '${descripcion}', estado='${estado}', categoria_id=${idFamilia};`
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    
                }
                try {
                    connection.query(sql, (err, result) => {
                        if (err) { 

                            mysqlPool.emit('error', err)
                            
                        }
                        connection.release(); // Importante liberar la conexión
                        if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }else {
                            resolve(false)
                        }
                    })
                } catch (error) {
                    mysqlPool.emit('error', err)
                    console.error(error);
                    ;
                }
      
            })
        } catch (err) {
            ;
            console.error(err.message);
        }
    })
}