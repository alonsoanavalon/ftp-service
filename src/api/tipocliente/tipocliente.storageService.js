const mysqlConnection = require('../../database/database')

exports.getAllTipoCliente = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM tipocliente';
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

exports.getTipoClienteById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM tipocliente WHERE id = ${id}`;
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

