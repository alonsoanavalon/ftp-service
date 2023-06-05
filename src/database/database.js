const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { logError } = require('../errorHandler');


const mysql = require('mysql');

let mysqlPool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 50, // limita el número de conexiones en el pool
    acquireTimeout: 7000 // tiempo máximo de espera para adquirir una conexión (en milisegundos)

});

mysqlPool.on('error', function (err) {

  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    console.warn('Error en referencia ', err.sqlMessage);
  } else {
    console.warn('Error desconocido', err.sqlMessage)
  }
    

    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNREFUSED' ) {
        console.log('Reconectando a la base de datos...');

        mysqlPool.end(function (err) {
            if (err) {
              console.log('Error al cerrar la conexión de MySQL: ', err);
            } else {
              console.log('Conexión de MySQL cerrada exitosamente.');
            }
          });


        mysqlPool = mysql.createPool({
            host: process.env.HOST,
            user: process.env.DB_USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            connectionLimit: 200,
            acquireTimeout: 7000
        });

        mysqlPool.getConnection(function (err, connection) {
            if (err) {
                console.log('Error al conectar a la base de datos: ', err);
                return;
            }

            console.log('Conexión a la base de datos establecida correctamente.');

            // Realizar tus operaciones de base de datos aquí

            connection.release();
        });
        console.log('***** BDD REINICIADA *****');
        logError(err)

    } 
});


process.on('exit', function () {
    mysqlPool.end(function (err) {
      if (err) {
        console.log('Error al cerrar la conexión de MySQL: ', err);
      } else {
        console.log('Conexión de MySQL cerrada exitosamente.');
      }
    });
  });


module.exports = mysqlPool;