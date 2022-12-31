const mysqlConnection = require('../../database/database')


exports.getAllListaSubmodelo = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM listasubmodelo';
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

exports.createListaSubmodelo = (listaProducto) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO listasubmodelo SET ?';
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

exports.getListaSubmodeloById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM listasubmodelo WHERE id = ${id}`;
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
            const sql = 'UPDATE listasubmodelo SET producto_id = ? , listasubmodelo_id = ? WHERE id = ?';
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


exports.getListaSubmodeloBySubmodelAndYear = (submodeloId) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT listasubmodelo.id FROM listasubmodelo INNER JOIN submodelo ON submodelo.id = listasubmodelo.submodelo_id WHERE submodelo.id = ${submodeloId};`;

            mysqlConnection.query(sql, (err, results) => {
                if (err) throw err;
             
                if (results.length) {
                    resolve(JSON.parse(JSON.stringify(results)))
                }
                
            })
        } catch (error) {
            console.error(error.message);
        }
    })
}


exports.insertOrUpdate = (id, submodelo_id, fecha) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `INSERT INTO listasubmodelo (id, submodelo_id, fecha) VALUES(${id}, ${submodelo_id},'${fecha}') ON DUPLICATE KEY UPDATE submodelo_id='${submodelo_id}'`;
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(result)
            })
        } catch (err) {
            reject(err);
            console.error(err.message);
            throw err;
        }
    })
}