const mysqlPool = require('../../database/database')


exports.getAllClientes = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM cliente';

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

exports.createCliente = (cliente) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO cliente SET ?';

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, cliente, (err, result) => {
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

exports.getClienteById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM cliente WHERE id = ${id}`;
    
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

exports.updateCliente = (cliente) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'UPDATE cliente SET nombre = ?, apellido = ?, contraseña = ?, email = ?, telefono = ?, rut = ?, giroempresa = ?, tipocliente_id = ? WHERE id = ?';

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(sql, dataCliente, (err, result) => {
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

exports.clienteByFilter = (email, phone, rut) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT cliente.id FROM cliente WHERE cliente.email = '${email}' OR cliente.telefono = ${phone} OR cliente.rut = ${rut}`;


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
            resolve(error);
            console.error(error);
        }
    })
}
