const mysqlConnection = require('../../database/database')

exports.getAllRegion = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM region';
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

exports.getRegionById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM region WHERE id = ${id}`;
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

