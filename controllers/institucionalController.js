const institucionalController = {
    index: (request, response) => {
        return response.render('index', { titulo: 'Home' });
    },
    sobre: (request, response) => {
        return response.render('sobre', { titulo: 'Sobre'});
    },
    servicos: (request, response) => {
        return response.render('servicos', { titulo: 'Servicos'});
    },
    contato: (request, response) => {
        return response.render('contato', { titulo: 'Contato'});
    },
    login: (request, response) => {
        return response.render('login', { titulo: 'Login'});
    },
    cadastro: (request, response) => {
        return response.render('cadastro', { titulo: 'Cadastro'});
    }
}

module.exports = institucionalController;