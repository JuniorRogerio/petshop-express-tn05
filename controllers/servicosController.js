// metodo index lista serviços
// metodo show que exibe detalhes do serviço
const servicosController = {
    index: (request, response) => {
        return response.send('exibindo lista de servicos');
    },
    show: (request, response) => {
        // console.log(request.params);
        // pegando parametro nome da rota /pets/:nome
        const {servico} = request.params;

        return response.send(`exibindo detalhes dos servicos ${servico}`);
    }
}

module.exports = servicosController;