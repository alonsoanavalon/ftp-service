const mysqlConnection = require('../../database/database')


exports.getAllClientes = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM cliente';
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

exports.createCliente = (cliente) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO cliente SET ?';
            mysqlConnection.query(sql, cliente, (error, result) => {
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

exports.getClienteById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM cliente WHERE id = ${id}`;
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

exports.clienteByFilter = (email, phone, rut) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT cliente.id FROM cliente WHERE cliente.email = '${email}' OR cliente.telefono = ${phone} OR cliente.rut = ${rut}`;
            mysqlConnection.query(sql, (error, result) => {
                if (error) {
                    console.error(error);
                    resolve(error);
                }
                console.log(result)
                resolve(JSON.parse(JSON.stringify(result)));
            })
        } catch (error) {
            resolve(error);
            console.error(error);
        }
    })
}
