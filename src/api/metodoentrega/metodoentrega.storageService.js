const mysqlConnection = require('../../database/database')

exports.getAllMetodoEntrega = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM metodoentrega';
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

exports.createMetodoEntrega = (metodoEntrega) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO metodoentrega SET ?';
            mysqlConnection.query(sql, metodoEntrega, (error, result) => {
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

exports.getMetodoEntregaById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM metodoentrega WHERE id = ${id}`;
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

