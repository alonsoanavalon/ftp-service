const fs = require('fs');

function logError(err) {
  const errorMessage = `${new Date().toISOString()} - ${err.stack}\n`;

  fs.appendFile('logs.txt', errorMessage, (error) => {
    if (error) console.error('Error al escribir en el archivo de registro:', error);
  });


}

module.exports = { logError };