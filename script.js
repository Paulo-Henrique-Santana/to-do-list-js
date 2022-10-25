const campo = document.forms.tarefa.campo;
const btnAdd = document.forms.tarefa.adicionar;
const tarefas = document.querySelector('.tarefas');

function adicionarTarefa(event) {
  event.preventDefault();
  const contemTarefa = Array.from(tarefas.children).some(li => li.firstChild.innerText === campo.value);
  if (campo.value !== '' && !contemTarefa) {
    let tarefa = document.createElement('li');
    tarefa.innerHTML = `<span>${campo.value}</span>
                        <div>
                          <button class="editar"><img src="./icone-editar.png"></button>
                          <button class="apagar"><img src="./icone-lixeira.png"></button>
                        </div>`;
    tarefa.addEventListener('click', marcarTarefaFeita)
    tarefa.querySelector('.editar').addEventListener('click', editarTarefa);
    tarefa.querySelector('.apagar').addEventListener('click', () => tarefas.removeChild(tarefa));
    tarefas.appendChild(tarefa);
  }
  campo.value = '';
  campo.focus();
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
  }
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