const mysqlConnection = require('../../database/database')

exports.getAllTipoUniversal = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM tipouniversal';
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

exports.getTipoUniversalById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM tipouniversal WHERE id = ${id}`;
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

