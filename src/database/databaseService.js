const ftpService = require('../ftp/ftpService')

exports.readFtp = (file, type) => {
    const ftpData = ftpService.read()
    console.log(ftpData)

}

