const campo = document.forms.tarefa.campo;
const btnAdd = document.forms.tarefa.adicionar;
const lista = document.querySelector('.lista');

function criarElemento(tag, texto) {
  const elemento = document.createElement(tag);
  if (texto) 
    elemento.innerText = texto;
  return elemento;
}

function criarTarefa(textoTarefa) {
  const li = criarElemento('li');
  const btnApagar = criarElemento('button', 'apagar');
  const btnEditar = criarElemento('button', 'editar')
  btnEditar.addEventListener('click', editarTarefa);
  btnApagar.addEventListener('click', apagarTarefa);
  li.appendChild(criarElemento('span', textoTarefa));
  li.appendChild(btnEditar);
  li.appendChild(btnApagar);
  li.addEventListener('click', marcarTarefaFeita);
  return li;
}

function verificarSeTarefaExiste(textoTarefa) {
  for(let i = 0; i < lista.childNodes.length; i++) {
    if (lista.childNodes[i].children[0].innerText === textoTarefa)
      return true;
  }
}

function adicionarTarefa(event) {
  event.preventDefault();
  if (campo.value !== '' && !verificarSeTarefaExiste(campo.value))
  lista.appendChild(criarTarefa(campo.value));
  campo.value = '';
  campo.focus();
}

function editarTarefa(event) {
  const li = event.target.parentElement;
  if (event.target.innerText === 'editar') {
    event.target.innerText = 'salvar';
    const spanTarefa = event.target.parentElement.firstChild;
    const inputEdicao = criarElemento('input');
    inputEdicao.value = spanTarefa.innerText;
    li.replaceChild(inputEdicao, spanTarefa);
    inputEdicao.focus();
  } else {
    event.target.innerText = 'editar';
    const inputEdicao = event.target.parentElement.firstChild;
    const spanTarefa = criarElemento('span', inputEdicao.value)
    li.replaceChild(spanTarefa, inputEdicao);
  }
}

function apagarTarefa(event) {
  const tarefa = event.target.parentElement;
  lista.removeChild(tarefa);
}


function marcarTarefaFeita(event) {
  if (event.target instanceof HTMLSpanElement)
    var textoTarefa = event.target;
  else if (event.target instanceof HTMLLIElement)
    var textoTarefa = event.target.children[0];

  if (textoTarefa)
    textoTarefa.style.textDecoration = textoTarefa.style.textDecoration !== 'line-through' ? 'line-through' : 'none';
}


btnAdd.addEventListener('click', adicionarTarefa);