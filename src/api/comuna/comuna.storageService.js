const mysqlConnection = require('../../database/database')


exports.getAllComuna = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM comuna';
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

exports.createComuna = (comuna) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO comuna SET ?';
            mysqlConnection.query(sql, comuna, (error, result) => {
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

exports.getComunaById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM comuna WHERE id = ${id}`;
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

exports.updateCliente = (cliente) => {
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
