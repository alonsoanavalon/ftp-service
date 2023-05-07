const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mysqlPool = require('../database/database')
const { promisify } = require('util')


// procedimientos para registrarnos

exports.register = async (req, res) => {

    try {
        const user = req.body.user
        const pass = req.body.password
        let passHash = await bcrypt.hash(pass, 8)




        mysqlPool.getConnection((err, connection) => {
            if (err) {
                console.error(err)

            }
            connection.query("INSERT INTO usuario SET ?", { nombre: user, clave: passHash }, (err, result) => {
                if (err) {
                    console.error(err)

                }
                connection.release(); // Importante liberar la conexión
                        if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
            })
        })
        res.redirect('/')
    } catch (err) {

        console.error(err)

    }
}


exports.login = async (req, res) => {
    try {

        const user = req.body.user
        const pass = req.body.password

        if (!user || !pass) {

            res.render("signin", {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un user y password",
                alertIcon: 'info',
                showConfirmButton: 'true',
                timer: false,
                ruta: '/signin'
            })
        } else {

            const results = await new Promise((resolve) => {

                mysqlPool.getConnection((err, connection) => {
                    if (err) {
                        console.error(err)
                    }
                    connection.query("SELECT * FROM usuario WHERE ?", {nombre:user}, (err, result) => {
                        if (err) {
                            console.error(err)
                        }
                        connection.release(); // Importante liberar la conexión
                                if (result) {
                            resolve(JSON.parse(JSON.stringify(result)))
                        }
                    })
                })
            })


            if (results.length == 0 || !(await bcrypt.compare(pass, results[0].clave))) {
                res.render("signin", {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: "/signin"
                })
            } else {

                // INICIO OK

                const id = results[0].clave
                const token = jwt.sign({ id: id }, 'secretito', {
                    expiresIn: '7d'
                })

                console.log("token", token)

                const cookiesOptions = {
                    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 70),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookiesOptions)
                res.render("signin", {
                    alert: true,
                    alertTitle: "Exitoso",
                    alertMessage: "Conexión exitosa",
                    alertIcon: 'success',
                    showConfirmButton: true,
                    timer: 800,
                    ruta: "/admin-nueve"
                })
            }



        }

        //Crear promesa que al resolverla, me envíe el id del usuario que ingresó, de esa forma
        // puedo enviar despues la info de este usuario, su panel, sus pedidos, etc.



    } catch (err) {
        console.log("err")
    }
}


exports.isAuthenticated = async (req, res, next) => {

    //Preguntamos por nuestra cookie

    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, 'secretito')
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                }
                connection.query('SELECT * FROM usuario WHERE id = ?', [decoded.id], (err, result) => {
                    if (err) { 
                        console.error(err) 
                    }
                    if (!result) { return next() }
                    connection.release(); // Importante liberar la conexión
                    req.user = result[0]
                    return next()
                })
            })

        } catch (err) {
            console.error(err)
            return next()
        }
    } else {
        res.redirect('/signin')
    }

}

exports.logout = (req, res) => {
    res.clearCookie('jwt')
    return res.redirect('/')
}





