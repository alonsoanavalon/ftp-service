const mysqlPool = require('../../database/database')

exports.getAllCategoria = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM categoria';

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        
                    }
                    connection.release(); // Importante liberar la conexión
                    console.log(result)
                    resolve(result)
                })
            })




        } catch (error) {
            
            console.error(error.message)
        }
    })    
}

exports.createCategoria = (categoria) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO categoria SET ?';
  
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(result)
                })
            })
        } catch (error) {
            
            console.error(error.message)
        }
    })    
}

exports.getCategoriaById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM categoria WHERE id = ${id}`;
    
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                          
                    }
                    connection.release(); // Importante liberar la conexión
               
                    resolve(result)
                })
            })
        } catch (error) {
            
            console.error(error.message)
        }
    })    
}

exports.updateCategoria = (categoria) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'UPDATE categoria SET imagen = ? WHERE id = ?';
            const dataCliente = [categoria.imagen, categoria.id]
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, dataCliente, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        
                    }
                    connection.release(); // Importante liberar la conexión
                    console.log(result)
                    resolve(result)
                })
            })
        } catch (error) {
            
            console.error(error.message)
        }
    })    
}



exports.insertOrUpdate = (id, nombreCategoria) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `INSERT INTO categoria (id, nombre) VALUES('${id}', '${nombreCategoria}') ON DUPLICATE KEY UPDATE categoria.nombre='${nombreCategoria}';`
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