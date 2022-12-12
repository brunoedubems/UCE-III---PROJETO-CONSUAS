const mongoose = require('mongoose');
//const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
cnpjCpf: { type: String, required: false, default: '' },
nome: { type: String, required: false, default: '' },
dataDeNascimento: { type: String, required: false, default: '' },
rg: { type: String, required: false, default: '' },
endereco: { type: String, required: false, default: '' },
inscricaoEstadual: { type: String, required: false, default: '' },
email: { type: String, required: false, default: '' },
telefone: { type: String, required: false, default: '' },
cnae: { type: String, required: false, default: '' },
cnpjMatriz: { type: String, required: false, default: '' },
nomeFantasia: { type: String, required: false, default: '' },
nomePresidente: { type: String, required: false, default: ' ' },
numeroDaPasta: { type: String, required: false, default: '' },
dataDeVisita: { type: String, required: false, default: '' },
dataDeAbertura: { type: String, required: false, default: '' },
dataMandato: { type: String, required: false, default: '' },
numero: { type: String, required: false, default: '' },
cep: { type: String, required: false, default: '' },
conselho: { type: String, required: false, default: '' },
receitaTotal: { type: String, required: false, default: '' },
fontesDeFinanciamento: { type: String, required: false, default: '' },
criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
this.body = body; 
this.errors = [];
this.contato = null;
}

Contato.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function() {
  this.cleanUp();
};

Contato.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

this.body = {
cnpjCpf: this.body.cnpjCpf,
nome: this.body.nome,
dataDeNascimento: this.body.dataDeNascimento,
rg: this.body.rg,
endereco: this.body.endereco,
inscricaoEstadual: this.body.inscricaoEstadual,
email: this.body.email,
telefone: this.body.telefone,
cnae: this.body.cnae,
cnpjMatriz: this.body.cnpjMatriz,
nomeFantasia: this.body.nomeFantasia,
nomePresidente: this.body.nomePresidente,
numeroDaPasta: this.body.numeroDaPasta,
dataDeVisita: this.body.dataDeVisita,
dataDeAbertura: this.body.dataDeAbertura,
dataMandato: this.body.dataMandato,
numero: this.body.numero,
cep: this.body.cep,
conselho: this.body.conselho,
receitaTotal: this.body.receitaTotal,
fontesDeFinanciamento: this.body.fontesDeFinanciamento,

  };
};

Contato.prototype.edit = async function(id){
  if(typeof id !== 'string') return;
  this.valida();
  if(this.erros.length > 0) return;
  this.contato = await ContatoModel.findByIdUpdate(id, this.body, { new: true });
};

//metodos estáticos
Contato.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
const contato = await ContatoModel.findById(id);
return contato;
}

Contato.buscaContatos = async function(id) {
const contatos = await ContatoModel.find()
.sort({ criadoEM: -1 });  //1 PARA ORDEM CRESCENTE -- 2 PARA DECRESCENTE
return contatos;
}

Contato.delete = async function(id) {
  if(typeof id !== 'string') return;
const contato = await ContatoModel.findOneAndDelete({_id: id});
return contato;
};

module.exports = Contato;
