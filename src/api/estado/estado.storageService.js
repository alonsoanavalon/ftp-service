const mysqlConnection = require('../../database/database')


exports.getAllEstado = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM estado';
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


exports.getEstadoById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM estado WHERE id = ${id}`;
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

exports.updateDireccion = (cliente) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'UPDATE cliente SET nombre = ?, apellido = ?, contraseña = ?, email = ?, telefono = ?, rut = ?, giroempresa = ?, tipocliente_id = ? WHERE id = ?';
            const dataCliente = [cliente.nombre, cliente.apellido, cliente.contraseña, cliente.email, cliente.telefono, cliente.rut, cliente.giroempresa, cliente.tipocliente_id, cliente.id]
            mysqlConnection.query(sql, dataCliente, (error, result) => {
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
