const mysqlConnection = require('../../database/database')


exports.getAllListaProducto = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM listaproducto';
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

exports.createListaProducto = (listaProducto) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO listaproducto SET ?';
            mysqlConnection.query(sql, listaProducto, (error, result) => {
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

exports.getListaProductoById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM listaproducto WHERE id = ${id}`;
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

exports.updateListaProducto = (listaproducto) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'UPDATE listaproducto SET producto_id = ? , listasubmodelo_id = ? WHERE id = ?';
            const dataListaProducto = [listaproducto.producto_id, listaproducto.listasubmodelo_id, listaproducto.id]
            mysqlConnection.query(sql, dataListaProducto, (error, result) => {
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


exports.insertOrUpdate = (id, producto_id, listasubmodelo_id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `INSERT INTO listaproducto (id, producto_id, listasubmodelo_id) VALUES('${id}', '${producto_id}', ${listasubmodelo_id}) ON DUPLICATE KEY UPDATE producto_id='${producto_id}', listasubmodelo_id=${listasubmodelo_id};`
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