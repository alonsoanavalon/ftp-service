const mysqlConnection = require('../../database/database')

exports.getAllUsuario = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM usuario';
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

exports.createUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO usuario SET ?';
            mysqlConnection.query(sql, usuario, (error, result) => {
                if (error) {
                    console.error(error.message);
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

exports.getUsuarioById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM usuario WHERE id = ${id}`;
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

exports.updateUsuario = (producto) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'UPDATE usuario SET codigo = ? , categoria_id = ? , tipouniversal_id = ?, SKU = ?, nombre = ?, precio = ?, marca = ?, descripcion = ?, cantidad = ?, imagen = ?, imagen_2 = ?, imagen_3 = ? WHERE id = ?';
            const dataProducto = [producto.codigo, producto.categoria_id, producto.tipouniversal_id, producto.SKU, producto.nombre, producto.precio, producto.marca, producto.descripcion, producto.cantidad, producto.imagen, producto.imagen_2, producto.imagen_3, producto.id]
            mysqlConnection.query(sql, dataProducto, (error, result) => {
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
