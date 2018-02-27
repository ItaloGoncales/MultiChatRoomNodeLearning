module.exports.startChat = function (application, req, res) {

    var form = req.body;

    req.assert('apelido', "Apelido não pode ser vazio.").notEmpty();
    req.assert('apelido', "Apelido tem que possuir entre 3 e 15 caracteres.").len(3, 15);

    var errors = req.validationErrors();

    if (errors) {
        res.render('index', { validation: errors });
        return;
    }

    application.get('io').emit(
        'msgToClient', 
        {
            apelido : form.apelido,
            message : " acabou de entrar no chat."
        }
    );

    res.render('chat', { apelido : form.apelido });
}