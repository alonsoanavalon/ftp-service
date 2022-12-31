const mysqlConnection = require('../../database/database')

exports.getAllCategoria = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM categoria';
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

exports.createCategoria = (categoria) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO categoria SET ?';
            mysqlConnection.query(sql, categoria, (error, result) => {
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

exports.getCategoriaById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM categoria WHERE id = ${id}`;
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

exports.updateCategoria = (categoria) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'UPDATE categoria SET imagen = ? WHERE id = ?';
            const dataCliente = [categoria.imagen, categoria.id]
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
