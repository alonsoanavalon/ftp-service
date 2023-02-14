const mysqlConnection = require('../../database/database')

exports.getAllMarca = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM marca';
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

exports.createMarca = (marca) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO marca SET ?';
            mysqlConnection.query(sql, marca, (error, result) => {
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

exports.getMarcaById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM marca WHERE id = ${id}`;
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


exports.insertOrUpdate = (id, nombre) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `INSERT INTO marca (id, nombre) VALUES(${id}, '${nombre}') ON DUPLICATE KEY UPDATE nombre='${nombre}'`;
            mysqlConnection.query(sql, (err, result) => {
                if (err) {
                    console.error(`
                    ${err.code}
                    ${err.sql}`)
                }
                resolve(result)
            })
        } catch (err) {
            reject(err);
            console.error(err.message);
            throw err;
        }
    })
}

