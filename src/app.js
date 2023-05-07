
/* Modules and variables */
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
var cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const ftpService = require('./ftp/ftpService')
//Esto inicia el script para leer el ftp y traermelo si se actualiza
ftpService.main()

/* Initializations */
const app = express()

// Settings

app.set('port', 3050)
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const allowedOrigins = ['www.autonueve.cl'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));

//Para eliminar la cache 
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});
// Rutas





app.listen(app.get('port'), () => {
    console.log("Inició el servidor en el puerto", app.get("port"))
})