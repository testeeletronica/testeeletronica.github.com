var listaPessoas = document.getElementById('listaPessoas');
var btnOrdenar = document.getElementById('btnOrdenar');
var appForm = document.getElementById('app-form');
var btnExemplo = document.getElementById('btnExemplo');

var pessoas = [];

appForm.Form.onsubmit = addPessoa;
btnOrdenar.onclick = ordenarLista;
btnExemplo.onclick = gerarListaSeed;

function addPessoa(e){
    e.preventDefault();

    var nome = e.target.pessoaNome.value;
    var sobrenome = e.target.pessoaSobrenome.value;
    var telefone = e.target.pessoaTelefone.value;

    var pessoa = {nome, sobrenome, telefone};

    var validation = validarCampos(pessoa);
    if(!validation.status){
        alert(validation.error);
        return;
    }
}

    pessoas.push(pessoa);
    appForm.reset();
    mostrarLista();
    console.log(pessoas);

    function validarCampos(pessoa){
        var validation = {status: true, error: '', };

        if(pessoa.nome.lenght === 0){
            validation.status = false;
            validation.error = 'Preencha o Nome';
        }

        else if(pessoa.sobrenome.lenght === 0){
            validation.status = false;
            validation.error = 'Preencha o Sobrenome';
        }

        else if(pessoa.sobrenome.lenght === 0){
            validation.status = false;
            validation.error = 'Preencha o Telefone';
        }
        return validation;
    }

    function mostrarLista(){
        listaPessoas.innerHTML = '';
        for(pessoa of pessoas){
            var nomeEl = document.createElement('strong');
            nomeEl.appendChild(document.createTextNode(pessoa.nome + ' ' + pessoa.sobrenome));

            var telefoneEl = document.createElement('p');
            telefoneEl.appendChild(document.createTextNode('Telefone: ' + pessoa.telefone));

            var indice = pessoa.indexOf(pessoa);

            var removerEl = document.createElement('a');
            removerEl.setAttribute('href', '#');
            var removerText = document.createTextNode('Remover');
            removerEl.appendChild(removerText);
            removerEl.setAttribute('onclick', 'removerPessoa(' + indice + ')');

            var itemEl = document.createElement('li');
            itemEl.appendChiled(nomeEl);
            itemEl.appendChiled(telefoneEl);
            itemEl.appendChiled(alterarEl);
            itemEl.appendChiled(removerEl);

            listaPessoas.appendChild(itemEl);
        }
    }

    function gerarListaSeed(){
        var pessoasExemplo = [
            {nome: 'Pedro', sobrenome: 'Santana', telefone: 30992388429},
            {nome: 'Lucas', sobrenome: 'Vieira', telefone: 14997365022},
            {nome: 'Antonio', sobrenome: 'Maria', telefone: 15992284032},
            {nome: 'Jose', sobrenome: 'Hernandes', telefone: 15999985560},
            {nome: 'Maria', sobrenome: 'Silva', telefone: 11993353719},
            {nome: 'Giovanna', sobrenome: 'Silva', telefone: 11994446018},
            {nome: 'Valaria', sobrenome: 'Santos', telefone: 19996772188},
            {nome: 'Fernando', sobrenome: 'Ferreira', telefone: 31993228511},
            {nome: 'Julia', sobrenome: 'Alcantra', telefone: 19997755194},
            {nome: 'Vinicius', sobrenome: 'Henrique', telefone: 19990582636},
        ];
        pessoas = pessoasExemplo;
        mostrarLista();
    }

    function removerPessoa(indice){
        pessoas.splice(indice, 1);
        mostrarLista();
    }

    function alterarPessoa(indice){
        var btnCadastrar = document.getElementById('btnCadastrar');
        var btnEditar = document.getElementById('btnEditar');
        var input_nome = document.getElementById('pessoaNome');
        var input_sobrenome = document.getElementById('pessoaSobrenome');
        var input_telefone = document.getElementById('pessoaTelefone');

        btnCadastrar.setAttribute('style', 'display: none');
        btnEditar.setAttribute('style', 'display:');

        input_nome.value = pessoas[indice].nome;
        input_sobrenome.value = pessoas[indice].sobrenome;
        input_telefone.value = pessoas[indice].telefone;

        btnEditar.onclick = function(){
            var pessoaAlterada = {
                nome: input_nome.value,
                sobrenome: input_sobrenome.value,
                telefone: input_telefone.value
            };

            console.log(pessoaAlterada);

            var validation = validarCampos(pessoaAlterada);
            if(!validation.status){
                alert(validation.error);
                return;
            }
            
            input_nome.value = '';
            input_sobrenome.value = '';
            input_telefone.value = '';

            btnCadastrar.setAttribute('style', 'display:');
            btnEditar.setAttribute('style', 'display:none');

            pessoas[indice] = pessoaAlterada;
            mostrarLista();
        };
    }

    function ordenarLista(){
        pessoas.sort(function(a, b){
            var x = a.nome.toLowerCase() + a.sobrenome.toLowerCase();
            var y = b.nome.toLowerCase() + b.sobrenome.toLowerCase();
            if(x < y) return -1;
            if(x > y) return 1;
            return 0;
        });
        mostrarLista();
    }