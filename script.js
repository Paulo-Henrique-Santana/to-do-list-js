const campo = document.forms.tarefa.campo;
const btnAdd = document.forms.tarefa.adicionar;
const tarefas = document.querySelector('.tarefas');

const adicionarTarefa = (textoTarefa, feita) => {
  if (textoTarefa !== '') {
    let tarefa = document.createElement('li');
    tarefa.innerHTML = `<span>${textoTarefa}</span>
                        <button class="editar"><img src="./icone-editar-branco.png"></button>
                        <button class="apagar"><img src="./icone-lixeira.png"></button>`;
    tarefa.addEventListener('click', (event) => marcarTarefaFeita(event, tarefa));
    if (feita) tarefa.classList.add('feita');
    tarefa.querySelector('.editar').addEventListener('click', () => editarTarefa(tarefa));
    tarefa.querySelector('.apagar').addEventListener('click', () => removeTarefa(tarefa));
    tarefas.appendChild(tarefa);
    salvarTarefas();
  }
  campo.value = '';
  campo.focus();
}

const editarTarefa = (tarefa) => {
  const btnEditar = tarefa.children[1];

  if (!btnEditar.classList.contains('ativo')) {
    btnEditar.classList.add('ativo');
    btnEditar.firstChild.setAttribute('src', './icone-editar-amarelo.png');
    const spanTarefa = btnEditar.parentElement.firstChild;
    const inputEdicao = document.createElement('input');
    inputEdicao.setAttribute('maxlength', 54);
    inputEdicao.value = spanTarefa.innerText;
    tarefa.replaceChild(inputEdicao, spanTarefa);
    inputEdicao.focus();
  } else {
    btnEditar.classList.remove('ativo');
    btnEditar.firstChild.setAttribute('src', './icone-editar-branco.png');
    const inputEdicao = btnEditar.parentElement.firstChild;
    const spanTarefa = document.createElement('span');
    spanTarefa.innerText = inputEdicao.value;
    tarefa.replaceChild(spanTarefa, inputEdicao);
    salvarTarefas();
  }
}

const removeTarefa = (tarefa) => {
  tarefas.removeChild(tarefa);
  salvarTarefas();
}

const marcarTarefaFeita = (event, tarefa) => {
  if (event.target instanceof HTMLSpanElement || event.target instanceof HTMLLIElement) {
    tarefa.classList.toggle('feita');
    salvarTarefas();
  }
}

const salvarTarefas = () => {
  arrayTarefas = [];
  tarefas.childNodes.forEach(li => {
    const tarefa = {
      texto: li.children[0].innerText,
    }
    if (li.classList.contains('feita')) tarefa.feita = true;
    else tarefa.feita = false;
    arrayTarefas.push(tarefa);
  });
  localStorage.tarefas = JSON.stringify(arrayTarefas);
}

const carregarTarefas = () => {
  const arrayTarefas = JSON.parse(localStorage.tarefas);
  arrayTarefas.forEach(tarefa => {
    if (tarefa.feita === true) adicionarTarefa(tarefa.texto, true);
    else adicionarTarefa(tarefa.texto);
  })
}

if (localStorage.tarefas) carregarTarefas();

btnAdd.addEventListener('click', event => {
  event.preventDefault();
  adicionarTarefa(campo.value);
});