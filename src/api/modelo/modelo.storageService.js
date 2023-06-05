const mysqlPool = require('../../database/database')


exports.getAllModelo = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM modelo order by nombre';
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

exports.createModelo = (modelo) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO modelo SET ?';
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
                    
                }
                try {
                    connection.query(sql, modelo, (err, result) => {
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

exports.getModeloById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM modelo WHERE id = ${id}`;
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

exports.insertOrUpdate = (id, id_marca, nombre) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `INSERT INTO modelo (id, marca_id, nombre) VALUES(${id}, ${id_marca}, '${nombre}') ON DUPLICATE KEY UPDATE nombre='${nombre}';`;
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



