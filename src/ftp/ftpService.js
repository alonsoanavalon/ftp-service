const lineReader = require('line-reader');
const marcaService = require('../api/marca/marca.service')
const modeloService = require('../api/modelo/modelo.service')
const categoriaService = require('../api/categoria/categoria.service')
const submodeloService = require('../api/submodelo/submodelo.service')
const listasubmodeloService = require('../api/listasubmodelo/listasubmodelo.service')
const productoService = require('../api/producto/producto.service')
const listaproductoService = require('../api/listaproducto/listaproducto.service')

//leer y meter a la carpeta

function cleanZeros (numbers) {
  const numbersToArray = numbers.toString().split("");
  let gotANumber = false;
  const cleanedNumber = numbersToArray.filter((number, key) => {
    
    if (gotANumber === false) {
      if (key === 0 && number !== '0') {
        gotANumber = true;
        return true;
      }
      if (number === '0') {
        if (numbersToArray[key+1] === '0'){ 
          return false
        } else {
          gotANumber = true;
          return false
        }
      }
    } else {
      return true;
    }

  })
  return cleanedNumber.join("")
  
}


async function readGeneCodi (fileName) {

  return new Promise((resolve, reject) => {
    try {
      console.log("reading genecodi...")
      let headers = undefined;
      let arrayDeObjetosGenerados = [];
       lineReader.eachLine(`src/ftp/RECIBIR/pruebas/${fileName}`, async function(line, last) {        
          if (line.length > 1) {
            if (headers === undefined) {
              //seteando lo que son los "key" o la primera linea del txt  /  columnas 
              headers = line.split(' | ').map((element) => element.trim())
            } else {
              const currentLine = line.split('|')
              if (currentLine.length === headers.length) {
                let lineObject = {}
                currentLine.forEach((element, index) => {
                  lineObject[headers[index]] = element;
                })
                arrayDeObjetosGenerados.push(lineObject)
            }
          }
    
          }
    
          //Cod.Marca | Cod.Modelo | Cod.Submodelo | Nomb.Sub-Modelo 
          if(last) {
            if (arrayDeObjetosGenerados.length >= 1) {

              const promisesArray = []
              arrayDeObjetosGenerados.forEach(async (objeto) => {
                
                const idMarca = cleanZeros(objeto['Marca'])
                const idModelo = cleanZeros(objeto['Modelo'])
                const idSubmodelo = cleanZeros(objeto['Submodelo'])
                const idAnoFab = cleanZeros(objeto['Anofab'])
                const idListaSubmodelo = `${idMarca}${idModelo}${idSubmodelo}${idAnoFab}`;
                const id = `${objeto['Codigo']}${idListaSubmodelo}`;
                const idProducto = objeto['Codigo']
                if (id) {
                  promisesArray.push(listaproductoService.insertOrUpdate(id, idProducto, idListaSubmodelo));
                } else {
                  console.log(`message: "No existe un id para agregar"`)
                  return {
                    message: "No existe un id para agregar"
                  }
                }


              })

              const results = await Promise.all(promisesArray)
              resolve(results)
              
              
            }
          }
        });
    
        
    } catch (err) {
      console.log(err)
    }
    
  })
  

  }

async function readProducto (fileName) {
  return new Promise((resolve, reject) => {
    try {
      let headers = undefined;
      let arrayDeObjetosGenerados = [];
       lineReader.eachLine(`src/ftp/RECIBIR/pruebas/${fileName}`, async function(line, last) {        
          if (line.length > 1) {
            if (headers === undefined) {
              //seteando lo que son los "key" o la primera linea del txt  /  columnas 
              headers = line.trim().split('|').map((element) => element.trim())
            } else {
              const currentLine = line.trim().split('|')
              if (currentLine.length === headers.length) {
                let lineObject = {}
                currentLine.forEach((element, index) => {
                  lineObject[headers[index]] = element;
                })
                arrayDeObjetosGenerados.push(lineObject)
            }
          }
    
          }
    
          //Cod.Marca | Cod.Modelo | Cod.Submodelo | Nomb.Sub-Modelo 
          //Aca voy a tener que agregar el campo de activo pasivo, y además tendré que modificar en
          //los get a la base de datos, que me traiga los que tengan X cantidad y además que cumplan con que esten activos.

          if(last) {
            if (arrayDeObjetosGenerados.length >= 1) {
              const promisesArray = []
              arrayDeObjetosGenerados.forEach( (objeto) => {
                const id = objeto['Codigo'];
                const glosa = `${objeto['Glosa 1']} ${objeto['Glosa 2']} ${objeto['Glosa 3']} ${objeto['Glosa 4']} ${objeto['Glosa 5']} ${objeto['Glosa 6']} ${objeto['Glosa 7']} ${objeto['Glosa 8']} ${objeto['Glosa 9']} ${objeto['Glosa 10']} `
                if (id) {
                  promisesArray.push(productoService.insertOrUpdate(id, objeto['Descripcion'], objeto['Precio Vta.'], objeto['Stock'], objeto['Prec.Local'], glosa, objeto['Estado Activo,Pasivo'], parseInt(objeto['Familia'])))

                } else {
                  return {
                    message: "No existe un id para agregar"
                  }
                }



              })

              const results = await Promise.allSettled(promisesArray)
              resolve(results)
              
            }
          }
        });
    
        
    } catch (err) {
      console.log(err)
    }
    
  })
  

  }

async function readAnoFab (fileName) {

  return new Promise((resolve, reject) => {
    try {
      console.log("reading anofab..")
      let headers = undefined;
      let arrayDeObjetosGenerados = [];
       lineReader.eachLine(`src/ftp/RECIBIR/pruebas/${fileName}`, async function(line, last) {        
          if (line.length > 1) {
            if (headers === undefined) {
              //seteando lo que son los "key" o la primera linea del txt  /  columnas 
              headers = line.split(' | ').map((element) => element.trim())
            } else {
              const currentLine = line.split('|')
              if (currentLine.length === headers.length) {
                let lineObject = {}
                currentLine.forEach((element, index) => {
                  lineObject[headers[index]] = element;
                })
                arrayDeObjetosGenerados.push(lineObject)
            }
          }
    
          } else {
            console.log(line, "La primera linea traia caracter inesperado")
          }
  
          //Cod.Marca | Cod.Modelo | Cod.Submodelo | Nomb.Sub-Modelo 
          if(last) {
            if (arrayDeObjetosGenerados.length >= 1) {

              const promisesArray = [];
              arrayDeObjetosGenerados.forEach( async (objeto) => {
                const idMarca = cleanZeros(objeto['Cod.Marca'])
                const idModelo = cleanZeros(objeto['Cod.Modelo'])
                const idSubmodelo = cleanZeros(objeto['Cod.Submodelo'])
                const idAno = cleanZeros(objeto['Ano'])
                const id = `${idMarca}${idModelo}${idSubmodelo}${idAno}`;
                if (id) {
                  promisesArray.push(listasubmodeloService.insertOrUpdate(id, `${idMarca}${idModelo}${idSubmodelo}`, objeto['Nomb.Ano']))
            
                } else {
                  console.log("No existe un id para agregar")
                  return {
                    message: "No existe un id para agregar"
                  }
                }
              })

              const results = await Promise.all(promisesArray);
              resolve(results)
              
            }
          }
        });
    
        
    } catch (err) {
      console.log(err)
    }
    
  })
  }

async function readSubmodelo (fileName) {

  return new Promise((resolve, reject) => {
    try {
      console.log("reading submodelo...")
      let headers = undefined;
      let arrayDeObjetosGenerados = [];
       lineReader.eachLine(`src/ftp/RECIBIR/pruebas/${fileName}`, async function(line, last) {        
          if (line.length > 1) {
            if (headers === undefined) {
              //seteando lo que son los "key" o la primera linea del txt  /  columnas 
              headers = line.split(' | ').map((element) => element.trim())
            } else {
              const currentLine = line.split('|')
              if (currentLine.length === headers.length) {
                let lineObject = {}
                currentLine.forEach((element, index) => {
                  lineObject[headers[index]] = element;
                })
                arrayDeObjetosGenerados.push(lineObject)
            }
          }
    
          }
    
          //Cod.Marca | Cod.Modelo | Cod.Submodelo | Nomb.Sub-Modelo 
          if(last) {
            if (arrayDeObjetosGenerados.length >= 1) {

              const promisesArray = [];


              arrayDeObjetosGenerados.forEach(async(objeto) => {
                const idMarca = cleanZeros(objeto['Cod.Marca'])
                const idModelo = cleanZeros(objeto['Cod.Modelo'])
                const idSubmodelo = cleanZeros(objeto['Cod.Submodelo'])
                const id = `${idMarca}${idModelo}${idSubmodelo}`
                //marcaService.insertOrUpdate(objeto['Cod.Marca'], objeto['Nomb.Marca'])
                if (id) {
                  promisesArray.push(submodeloService.insertOrUpdate(id, `${idMarca}${idModelo}`, objeto['Nomb.Sub-Modelo']))
                } else {
                  console.log(`message: "No existe un id para agregar"`)
                  return {
                    message: "No existe un id para agregar"
                  }
                }
              })

              const responses = await Promise.all(promisesArray)
              resolve(responses)


              
            }
          }
        });
    
        
    } catch (err) {
      console.log(err)
    }
    
  })
  

}
async function readFamilia (fileName) {

  return new Promise((resolve, reject) => {
    try {
      let headers = undefined;
      let arrayDeObjetosGenerados = [];
       lineReader.eachLine(`src/ftp/RECIBIR/pruebas/${fileName}`, async function(line, last) {        
          if (line.length > 1) {
            if (headers === undefined) {
              //seteando lo que son los "key" o la primera linea del txt  /  columnas 
              headers = line.split('|').map((element) => element.trim())
            } else {
              const currentLine = line.split('|')
              if (currentLine.length === headers.length) {
                let lineObject = {}
                currentLine.forEach((element, index) => {
                  lineObject[headers[index]] = element;
                })
                arrayDeObjetosGenerados.push(lineObject)
            }
          }
          //Cod.Famil|  Nombre Familia 

          }
          if(last) {
            if (arrayDeObjetosGenerados.length >= 1) {

              const promisesArray = []
              arrayDeObjetosGenerados.forEach(async (objeto) => {
                const id = parseInt(objeto['Cod.Famil'])
                const nombreCategoria = objeto['Nombre Familia']
                if (id) {
    
                  promisesArray.push(categoriaService.insertOrUpdate(id, nombreCategoria));
       
                } else {
                  console.log(`message: "No existe un id para agregar"`)
                  return {
                    message: "No existe un id para agregar"
                  }
                }
              })

              const results = await Promise.all(promisesArray);
              resolve(results)
              
            }
          }
        });
  
        
    } catch (err) {
  
      console.log(err)
    }
  })
  
  
  
  
  
  }

  
async function readModelo (fileName) {

return new Promise((resolve, reject) => {
  try {
    console.log("reading modelo...")
    let headers = undefined;
    let arrayDeObjetosGenerados = [];
     lineReader.eachLine(`src/ftp/RECIBIR/pruebas/${fileName}`, async function(line, last) {        
        if (line.length > 1) {
          if (headers === undefined) {
            //seteando lo que son los "key" o la primera linea del txt  /  columnas 
            headers = line.split(' | ').map((element) => element.trim())
          } else {
            const currentLine = line.split('|')
            if (currentLine.length === headers.length) {
              let lineObject = {}
              currentLine.forEach((element, index) => {
                lineObject[headers[index]] = element;
              })
              arrayDeObjetosGenerados.push(lineObject)
          }
        }

        }
        if(last) {
          if (arrayDeObjetosGenerados.length >= 1) {

            const promisesArray = []
            arrayDeObjetosGenerados.forEach(async (objeto) => {
              const idMarca = cleanZeros(objeto['Cod.Marca'])
              const idModelo = cleanZeros(objeto['Cod.Modelo'])
              const id = `${idMarca}${idModelo}`;
              if (id) {
                promisesArray.push(modeloService.insertOrUpdate(id, objeto['Cod.Marca'], objeto['Nomb.Modelo']));
          
              } else {
                console.log(`message: "No existe un id para agregar"`)
                return {
                  message: "No existe un id para agregar"
                }
              }

            })


            const results = await Promise.all(promisesArray);
            resolve(results)
            
          }
        }
      });

      
  } catch (err) {

    console.log(err)
  }
})





}

async function readMarca (fileName) {
  return new Promise((resolve, reject) => {
    console.log("reading marca...")
    try {
      let headers = undefined;
      let arrayDeObjetosGenerados = [];
       lineReader.eachLine(`src/ftp/RECIBIR/pruebas/${fileName}`, async function(line, last) {        
          if (line.length > 1) {
            if (headers === undefined) {
              //seteando lo que son los "key" o la primera linea del txt  /  columnas 
              headers = line.split(' | ').map((element) => element.trim())
            } else {
              const currentLine = line.split('|')
              if (currentLine.length === headers.length) {
                let lineObject = {}
                currentLine.forEach((element, index) => {
                  lineObject[headers[index]] = element;
                })
                arrayDeObjetosGenerados.push(lineObject)
            }
          }
  
          }
          if(last) {
            if (arrayDeObjetosGenerados.length >= 1) {
              const promisesArray = []
              arrayDeObjetosGenerados.forEach((objeto) => {
                if (objeto['Cod.Marca']) {
                  promisesArray.push(marcaService.insertOrUpdate(objeto['Cod.Marca'], objeto['Nomb.Marca']))
                } else {
                  console.log(`message: "No existe un id para agregar"`)
                  return {
                    message: "No existe un id para agregar"
                  }
                }
              })

              const results = Promise.all(promisesArray);
              resolve (results)
              
            }
          }
        });
  
        
    } catch (err) {

      console.log(err)
    }
  })


}
//modified files lo estaba ocupando para traerme solo los modificados, y en base a eso leerlos en orden
//no tener que leer todos los archivos, quizas despues pueden ser muy grandes y si es cada 10 minutos capaz se toma 1 o 2 en solo cargar todo denuevo.
exports.read = (path, modifiedFiles) => {
    
let Client = require('ssh2-sftp-client');
const config = {
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT,
  username: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD
}



async function main() {
    const client = new Client('upload-test');
    const dst = `${process.env.FTP_FOLDER}${path}`;
    const src = path;

    try {
      await client.connect(config);
      client.on('download', info => {
      console.log(`Listener: Download ${info.source}`);
      });
      const downloadedFile = await client.downloadDir(src, dst);
      return downloadedFile
    } catch (err) {
      console.log(err);
      return err
    } finally {
      console.log(dst)
      // await client.delete('RECIBIR/pruebas/PRODUCTO.txt')
      const listaArchivos = await client.list('RECIBIR/pruebas');


      const enumFiles = {
        MARCA: 'MA',
        MODELO: 'MO',
        SUBMODELO: 'SU',
        ANOFAB: 'AN',
        PRODUCTO: 'PR',
        GENECODI: 'GE',
        FAMILIA: 'FA'
      }

      const family = listaArchivos.filter((file) => file.name.includes(enumFiles.FAMILIA))
      const marca = listaArchivos.filter((file) => file.name.includes(enumFiles.MARCA))
      const modelo = listaArchivos.filter((file) => file.name.includes(enumFiles.MODELO))
      const submodelo = listaArchivos.filter((file) => file.name.includes(enumFiles.SUBMODELO))
      const anofab = listaArchivos.filter((file) => file.name.includes(enumFiles.ANOFAB))
      const producto = listaArchivos.filter((file) => file.name.includes(enumFiles.PRODUCTO))
      const genecodi = listaArchivos.filter((file) => file.name.includes(enumFiles.GENECODI))

      const fileNames = {
        family: family.length > 0 && family[0].name,
        marca: marca.length > 0 && marca[0].name,
        modelo: modelo.length > 0 && modelo[0].name,
        submodelo: submodelo.length > 0 && submodelo[0].name,
        anofab: anofab.length > 0 && anofab[0].name,
        producto: producto.length > 0 && producto[0].name,
        genecodi: genecodi.length > 0 && genecodi[0].name
      }

      listaArchivos?.forEach(async (archivo) => {
        console.log(`Archivo eliminado: ${archivo.name}`);
       client.delete(`${src}/${archivo.name}`);

    })

      const res = await Promise.allSettled(listaArchivos);
      console.log(res)

      
      client.end();

/*         modifiedFiles.forEach(async (file) => { */
/*           if (file === 1) { */
            if (fileNames.marca) {
              await readMarca(fileNames.marca)
            }

            if (fileNames.modelo) {
              await readModelo(fileNames.modelo)
            }

            if (fileNames.submodelo) {
              await readSubmodelo(fileNames.submodelo)
            }

            if (fileNames.anofab) {
              await readAnoFab(fileNames.anofab)
            }

            if(fileNames.family) {
              await readFamilia(fileNames.family)
            }

            if(fileNames.producto) {
              await readProducto(fileNames.producto)
            }

            if (fileNames.genecodi) {
              await readGeneCodi(fileNames.genecodi)
            }



/*           }
  
        }) */

        
    }

    

}

  main()
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(`main error: ${err.message}`);
  });
}




//Ver tema hora
exports.list = async (path) => {
  
let Client = require('ssh2-sftp-client');
const config = {
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT,
  username: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD
}

    const client = new Client('read');  
    try {
      await client.connect(config);
      const dates = [];
      const datesArray = [];
      const data = await client.list(path);
      data.map((file) => {
        let object = {};
        const fileName = file.name.replace(".txt", "");

        //OJO que es esto lo que marca el orden en que se leerán los archivos, el sort solo se maneja bien del 1 al 9, con 2 digitos se confunde y pone al numero '22' de los segundos. Si es que se llegaran a añadir mas de 10 ficheros es probable que esto falle porque el fichero 11 va a ser el 1ero o 2ndo, y puede que haya que cargar los de entremedio para que este no tenga conflictos

        if  (fileName === 'MARCA1') {
          object['file'] = 1;
        } else if (fileName === 'MODELO1') {
          object['file'] = 2;
        } else if (fileName === 'SUBMODELO1') {
          object['file'] = 3;
        } else if (fileName === 'ANOFAB1') {
          object['file'] = 4;
        } else if (fileName === 'PRODUCTO') {
          object['file'] = 5;
        } else if (fileName === 'GENECODI1') {
          object['file'] = 6;
        } else if (fileName === 'FAMILIA1') {
          object['file'] = 7;
        }

        object['modify_time'] = file.modifyTime

        datesArray.push(object);

        data.map((file) => {
          dates.push(file.modifyTime);
        })
      })
      if (dates.length > 0) {
        return {
          lastDate: dates.sort().reverse()[0],
          datesArray: datesArray.sort()
        }
      } else {
        return null;
      }
    } finally {
      client.end();
    }



}

exports.getUpdatedData = async (path, firstTime, lastDate) => {

  try {
  let lastGlobalDate = lastDate;


  if (firstTime) {

    let modifiedFiles = [];
    let reviewResponse;

    reviewResponse = await this.list(path)

    console.log(lastGlobalDate, "aca")
    if (reviewResponse) {
      if (reviewResponse.datesArray.length > 0) {
        reviewResponse.datesArray.forEach((date) => {
          if (date.modify_time > lastGlobalDate) {
            modifiedFiles.push(date.file)
          } 
        })
      } 
  
   

        this.read(path, modifiedFiles)

  
      return reviewResponse.lastDate
    } else {
      console.log("no hay archivos")
      return;
    }
  
  
  } else {
    setInterval( async () => {
      let modifiedFiles = [];
      let reviewResponse;
      reviewResponse = await this.list(path)
  
      if (reviewResponse) {
        if (reviewResponse.datesArray.length > 0) {
          reviewResponse.datesArray.forEach((date) => {
            if (date.modify_time > lastGlobalDate) {
              modifiedFiles.push(date.file)
            } 
          })
        } 
    
     

          this.read(path, modifiedFiles)
      
      } else {
        console.log("no hay archivos")
      }
      
  
    }, 60000)

    return true;
  }

  } catch(err) {
    console.log(err);
    return err;
  }

  


}

exports.main  = async () => {
  console.log("ejecutando main...")
  try {
    //La rutina se ejecuta automáticamente al iniciar el servidor
    //Luego comienza una rutina donde cada 1 minuto se verifica y actualiza
    console.log("ejecutando try...")
    const lastDate = await this.getUpdatedData('RECIBIR/pruebas', true, 0)
    setTimeout(() => {
      console.log("ejecutando timeout...")
      this.getUpdatedData('RECIBIR/pruebas', false, lastDate)
    }, process.env.CRON)

  } catch (err) {
    console.log(err)
  }
}

