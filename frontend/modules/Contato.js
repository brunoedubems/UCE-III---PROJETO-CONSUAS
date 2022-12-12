import validator from 'validator'
export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }
    init() {
        //this.events();
        alert('bruno')
    }
    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.valida(e)
        })
    }
    valida(e) {
        const erros = document.querySelectorAll('.erro');
        for (let p of erros) {
            p.remove();
        };

        const el = e.target;
        const nomeInput = el.querySelector('input[class="nome"]');
        const celInput = el.querySelector('input[class="cel"]');
        const emailInput = el.querySelector('input[class="email"]');
        let error = false;
        if (!nomeInput.value) {
            // criar p depois do input para exibir os erros
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Nome precisa ser preenchido')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            nomeInput.after(p);
            error = true;
        }
        if(!emailInput.value && !celInput.value){
            // criar p depois do input para exibir os erros
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Email ou telefone deve ser preenchido')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            const genErr = el.querySelector('span[class="genErr"]');
            genErr.after(p);
            error = true;
            return;
        }
        if (!celInput.value && !validator.isEmail(emailInput.value)) {
            // criar p depois do input para exibir os erros
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Email inválido')
            p.appendChild(errorMsg);
            p.classList.add('erro');
            p.classList.add('alert-danger');
            emailInput.after(p);
            error = true;
        }


        // se não houver erro, premite envio do formulário
        if (!error) el.submit();
    }
}