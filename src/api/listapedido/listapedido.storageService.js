const mysqlConnection = require('../../database/database')

exports.getAllListaPedido = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM listapedido';
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

exports.createListaPedido = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO listapedido SET ?';
            mysqlConnection.query(sql, data, (error, result) => {
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


exports.getListaPedidoById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM listapedido WHERE id = ${id}`;
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
