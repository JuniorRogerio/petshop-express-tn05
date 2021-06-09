const fs = require('fs');

const log = (request, response, next) => {
    /** criar o arquivo log,txt se não existir, adicionar mensagem no arquivo */
    fs.appendFileSync('log.txt', `O usuário acessou a url: ${request.url} \n`);
    /** executa a próxima função (controller) */
    next();
}

/** exporta o middleware */
module.exports = log;