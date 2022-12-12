const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('inicio');
    return res.render('login');
  };
  
 exports.register = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.register(); // registra e valida os campos

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                    return res.redirect('/login/index');
            });
            return;
        }
        //quando o usuario for criado com sucesso
        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(function() {
           return res.redirect('/login/index');
        });
        //return res.send(login.errors);
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async function(req, res) {
        try {
            const login = new Login(req.body); // usando a classe de login
            await login.login(); // registra e valida os campos para fazer o login
        
            if(login.errors.length > 0) { // se tiver erro aparece as msg
                req.flash('errors', login.errors);
                req.session.save(function() {
                        return res.redirect('/login/index');
                });
                return;
            }
            //quando o usuario for criado com sucesso
            req.flash('success', 'Você entrou no sistema.');
            req.session.user = login.user; 
            req.session.save(function() {
               return res.redirect('/login/index');
            });
            //return res.send(login.errors);
        } catch(e) {
            console.log(e);
            return res.render('404');
        }
        };
        
        exports.logout = function(req, res) {
          req.session.destroy();
          res.redirect('/');
        };
        
        