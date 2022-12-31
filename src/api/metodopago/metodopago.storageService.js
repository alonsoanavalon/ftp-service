const mysqlConnection = require('../../database/database')

exports.getAllMetodoPago = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM metodopago';
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

exports.createMetodoPago = (metodoPago) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO metodopago SET ?';
            mysqlConnection.query(sql, metodoPago, (error, result) => {
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

exports.getMetodoPagoById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM metodopago WHERE id = ${id}`;
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

