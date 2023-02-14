const mysqlConnection = require('../../database/database')


exports.getAllModelo = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM modelo';
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

exports.createModelo = (modelo) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO modelo SET ?';
            mysqlConnection.query(sql, modelo, (error, result) => {
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

exports.getModeloById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM modelo WHERE id = ${id}`;
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

exports.insertOrUpdate = (id, id_marca, nombre) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `INSERT INTO modelo (id, marca_id, nombre) VALUES(${id}, ${id_marca}, '${nombre}') ON DUPLICATE KEY UPDATE nombre='${nombre}';`;
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



