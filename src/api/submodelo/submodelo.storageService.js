const mysqlPool = require('../../database/database')


exports.getAllSubmodelo = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM submodelo';
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

exports.createSubmodelo = (submodelo) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO submodelo SET ?';

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
                    
                }
                try {
                    connection.query(sql, submodelo, (err, result) => {
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

exports.getSubmodeloById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM submodelo WHERE id = ${id}`;
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


exports.insertOrUpdate = (id, id_modelo, nombre) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `INSERT INTO submodelo (id, modelo_id, nombre) VALUES(${id}, ${id_modelo}, '${nombre}') ON DUPLICATE KEY UPDATE nombre='${nombre}';`;
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
                                    if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
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
            return;
        }
    })
}



