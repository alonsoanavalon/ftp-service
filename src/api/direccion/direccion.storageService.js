const mysqlConnection = require('../../database/database')

exports.getAllDireccion = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM direccion';
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

exports.createDireccion = (direccion) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO direccion SET ?';
            mysqlConnection.query(sql, direccion, (error, result) => {
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

exports.getDireccionById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM direccion WHERE id = ${id}`;
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
