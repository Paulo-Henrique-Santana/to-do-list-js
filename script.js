const campo = document.forms.tarefa.campo;
const btnAdd = document.forms.tarefa.adicionar;
const tarefas = document.querySelector('.tarefas');

function adicionarTarefa(textoTarefa, feita) {
  const contemTarefa = Array.from(tarefas.children).some(li => li.firstChild.innerText === textoTarefa);
  if (textoTarefa !== '' && !contemTarefa) {
    let tarefa = document.createElement('li');
    tarefa.innerHTML = `<span>${textoTarefa}</span>
                        <div>
                          <button class="editar"><img src="./icone-editar.png"></button>
                          <button class="apagar"><img src="./icone-lixeira.png"></button>
                        </div>`;
    tarefa.addEventListener('click', marcarTarefaFeita);
    if (feita) tarefa.querySelector('span').style.textDecoration = 'line-through';
    tarefa.querySelector('.editar').addEventListener('click', editarTarefa);
    tarefa.querySelector('.apagar').addEventListener('click', () => removeTarefa(tarefa));
    tarefas.appendChild(tarefa);
  }
  campo.value = '';
  campo.focus();
  salvarTarefas();
}

function editarTarefa(event) {
  if (event.target instanceof HTMLImageElement) var btnEditar = event.target.parentElement;
  else var btnEditar = event.target;

  const li = btnEditar.parentElement.parentElement;
  if (!btnEditar.classList.contains('ativo')) {
    btnEditar.classList.add('ativo');
    const spanTarefa = btnEditar.parentElement.parentElement.firstChild;
    const inputEdicao = document.createElement('input');
    inputEdicao.value = spanTarefa.innerText;
    li.replaceChild(inputEdicao, spanTarefa);
    inputEdicao.focus();
  } else {
    btnEditar.classList.remove('ativo');
    const inputEdicao = btnEditar.parentElement.parentElement.firstChild;
    const spanTarefa = document.createElement('span');
    spanTarefa.innerText = inputEdicao.value;
    li.replaceChild(spanTarefa, inputEdicao);
    salvarTarefas()
  }
}

function removeTarefa(tarefa) {
  tarefas.removeChild(tarefa);
  salvarTarefas();
}

function marcarTarefaFeita(event) {
  if (event.target instanceof HTMLSpanElement)
    var textoTarefa = event.target;
  else if (event.target instanceof HTMLLIElement)
    var textoTarefa = event.target.children[0];

  if (textoTarefa)
    textoTarefa.style.textDecoration = textoTarefa.style.textDecoration !== 'line-through' ? 'line-through' : 'none';
  salvarTarefas();
}

function salvarTarefas() {
  const spanTarefas = tarefas.querySelectorAll('span');
  arrayTarefas = [];
  spanTarefas.forEach(t => {
    const tarefa = {
      texto: t.innerText,
    }
    if (t.style.textDecoration === 'line-through') tarefa.feita = true;
    else tarefa.feita = false;
    arrayTarefas.push(tarefa);
  });
  localStorage.tarefas = JSON.stringify(arrayTarefas);
}

function carregarTarefas() {
  const arrayTarefas = JSON.parse(localStorage.tarefas);
  arrayTarefas.forEach(tarefa => {
    if (tarefa.feita === true) adicionarTarefa(tarefa.texto, true);
    else adicionarTarefa(tarefa.texto);
  })
}

if (localStorage.tarefas) carregarTarefas();

btnAdd.addEventListener('click', event => {
  event.preventDefault();
  adicionarTarefa(campo.value)
});