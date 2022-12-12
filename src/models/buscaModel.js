const mongoose = require('mongoose');
const buscaModel = mongoose.model('Contato', ContatoSchema);



class Busca {
    constructor(body) {
      this.body = body;
      this.errors = [];
      this.user = null;
    }
}



module.exports = Busca;