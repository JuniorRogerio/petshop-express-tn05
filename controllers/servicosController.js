/** módulo instalado para manipulação de arquivos */
const fs = require('fs');
/** módulo nativo para manipulação de arquivos */
const path = require('path');
/** módulo instalado para gerar id */
const {uuid} = require('uuidv4');
/** caminho do arquivo json */
const servicosPath = path.join('servicos.json');
/** lê conteúdo do arquivo json */
let servicos = fs.readFileSync(servicosPath, { encoding: 'utf-8' });
/** converte JSON para array */
servicos = JSON.parse(servicos);

// metodo index lista serviços
// metodo show que exibe detalhes do serviço
const servicosController = {
    index: (request, response) => {
        return response.render('adminServicos', { titulo: 'Serviços', servicos });
    },
    cadastro: (request, response) => {
        return response.render('servicosCadastro', { titulo: 'Cadastrar Serviço' });
    },
    salvar: (request, response) => {
        let { nome, descricao, preco } = request.body;

        /** pegando o nome do arquivo (upload) */
        let ilustracao = request.file.filename;

        /** adiciona o novo serviço no array */
        servicos.push({ id: uuid(), nome, descricao, preco, ilustracao });
        /** converter o array para json */
        let dadosJson = JSON.stringify(servicos);
        /** salva json atualizando no arquivo */
        fs.writeFileSync(servicosPath, dadosJson);

        /* redireciona para lista de serviços*/
        return response.redirect('/admin/servicos');
    },
    show: (request, response) => {
        // console.log(request.params);
        // pegando parametro nome da rota /pets/:nome
        const {nome} = request.params;

        return response.send(`exibindo detalhes dos servicos ${nome}`);
    }
}

module.exports = servicosController;