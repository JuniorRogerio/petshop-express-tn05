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
    editar: (request, response) => {
        /** pegando parâmetro id da URL */
        let {id} = request.params;
        /** busca serviço pelo id */
        let servicoEncontrado = servicos.find(servico => servico.id == id);
        /** renderiza view e manda titulo e objeto do serviço */
        return response.render('servicosEditar', { titulo: 'Editar Serviços', servico: servicoEncontrado});

    },
    atualizar: (request, response) => {
        /** pegando parametro id da URL */
        let { id } = request.params;
        /** pegando informações do formulário */
        let { nome, descricao, preco } = request.body;
        /** busca serviço pelo id */
        let servicoEncontrado = servicos.find(servico => servico.id == id);
        /** atribuir os novos valores ao servicoEncontrado */
        servicoEncontrado.nome = nome;
        servicoEncontrado.descricao = descricao;
        servicoEncontrado.preco = preco;
        /** verifica se tem uma nova imagem antes de atribuir */
        if(request.file){
            servicoEncontrado.ilustracao = request.file.filename;
        }

        /** converter o array para json */
        let dadosJson = JSON.stringify(servicos);
        /** salva json atualizado no arquivo */
        fs.writeFileSync(servicosPath, dadosJson);

        /* redireciona para lista de serviços */
        return response.redirect('/admin/servicos');

    }
}

module.exports = servicosController;