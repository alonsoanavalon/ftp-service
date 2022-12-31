
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

/* Variables de ruteo */

const clientes = require('./api/clientes/clientes.controller')
const listaProducto = require('./api/listaproducto/listaproducto.controller')
const pedido = require('./api/pedido/pedido.controller')
const producto = require('./api/producto/producto.controller')
const categoria = require('./api/categoria/categoria.controller')
const comuna = require('./api/comuna/comuna.controller')
const direccion = require('./api/direccion/direccion.controller')
const modelo = require('./api/modelo/modelo.controller')
const marca = require('./api/marca/marca.controller')
const submodelo = require('./api/submodelo/submodelo.controller')
const estado = require('./api/estado/estado.controller')
//const fabricacion = require('./api/fabricacion/fabricacion.controller')
const listaPedido = require('./api/listapedido/listapedido.controller')
const listaSubmodelo = require('./api/listasubmodelo/listasubmodelo.controller')
const metodoEntrega = require('./api/metodoentrega/metodoentrega.controller')
const metodoPago = require('./api/metodopago/metodopago.controller')
const region = require('./api/region/region.controller')
const tipoCliente = require('./api/tipocliente/tipocliente.controller')
const tipoDocumento = require('./api/tipodocumento/tipodocumento.controller')
const tipoUniversal = require('./api/tipouniversal/tipouniversal.controller')
const usuario = require('./api/usuario/usuario.controller')
const estadoService = require('./api/estado/estado.service')

/* Initializations */
const app = express()



// Settings

app.set('port', process.env.PORT || 3000)
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



app.use('/api/clientes', clientes)
app.use('/api/listaproducto', listaProducto)
app.use('/api/pedido', pedido)
app.use('/api/producto', producto)
app.use('/api/categoria', categoria)
app.use('/api/comuna', comuna)
app.use('/api/direccion', direccion)
app.use('/api/modelo', modelo)
app.use('/api/marca', marca)
app.use('/api/submodelo', submodelo)
app.use('/api/estado', estado)
app.use('/api/listapedido', listaPedido)
app.use('/api/listasubmodelo', listaSubmodelo)
app.use('/api/metodoentrega', metodoEntrega)
app.use('/api/metodopago', metodoPago)
app.use('/api/region', region)
app.use('/api/tipocliente', tipoCliente)
app.use('/api/tipodocumento', tipoDocumento)
app.use('/api/tipouniversal', tipoUniversal)
app.use('/api/usuario', usuario)


app.listen(app.get('port'), () => {
    console.log("Inició el servidor en el puerto", app.get("port"))
})