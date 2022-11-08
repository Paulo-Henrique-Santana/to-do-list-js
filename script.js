const campo = document.forms.tarefa.campo;
const btnAdd = document.forms.tarefa.adicionar;
const tarefas = document.querySelector('.tarefas');

const adicionarTarefa = (textoTarefa, feita = false, cor) => {
  if (textoTarefa !== '') {
    let tarefa = document.createElement('li');
    tarefa.innerHTML = `<div class='setas'>
                          <img src='./seta-cima.png' class='seta-cima'>
                          <img src='./seta-baixo.png' class='seta-baixo'>
                        </div>
                        <span>${textoTarefa}</span>
                        <button class='editar'><img src='./icone-editar-branco.png'></button>
                        <button class='apagar'><img src='./icone-lixeira.png'></button>
                        <div class='paleta-cores'>
                        <button class='branco' data-cor='ffffff'></button>
                          <button class='azul' data-cor='a0c4ff'></button>
                          <button class='amarelo' data-cor='fdffb6'></button>
                          <button class='vermelho' data-cor='ffadad'></button>
                          <button class='verde' data-cor='caffbf'></button>
                        </div>`;
    if (feita === true) tarefa.classList.add('feita');
    if (cor) tarefa.style.backgroundColor = cor;
    tarefa.addEventListener('click', (event) => marcarTarefaFeita(event, tarefa));
    tarefa.querySelector('.seta-cima').addEventListener('click', () => subirTarefa(tarefa));
    tarefa.querySelector('.seta-baixo').addEventListener('click', () => descerTarefa(tarefa));
    tarefa.querySelector('.editar').addEventListener('click', () => editarTarefa(tarefa));
    tarefa.querySelector('.apagar').addEventListener('click', () => removeTarefa(tarefa));
    const coresPaleta = tarefa.querySelectorAll('.paleta-cores button');
    coresPaleta.forEach((botao) => {
      botao.addEventListener('click', () => tarefa.style.backgroundColor = `#${botao.dataset.cor}`);
    });
    tarefas.appendChild(tarefa);
    salvarTarefas();
  }
  campo.value = '';
  campo.focus();
}

const subirTarefa = (tarefa) => {
  if (tarefa.previousElementSibling) tarefas.insertBefore(tarefa, tarefa.previousElementSibling)
  salvarTarefas();
}

const descerTarefa = (tarefa) => {
  if (tarefa.nextElementSibling) tarefas.insertBefore(tarefa.nextElementSibling, tarefa)
  salvarTarefas();
}

const editarTarefa = (tarefa) => {
  const btnEditar = tarefa.querySelector('.editar');
  tarefa.querySelector('.paleta-cores').classList.toggle('ativo');

  if (!btnEditar.classList.contains('ativo')) {
    btnEditar.classList.add('ativo');
    btnEditar.firstChild.setAttribute('src', './icone-editar-amarelo.png');
    const spanTarefa = tarefa.querySelector('span');
    const inputEdicao = document.createElement('input');
    inputEdicao.setAttribute('maxlength', 53);
    inputEdicao.value = spanTarefa.innerText;
    tarefa.replaceChild(inputEdicao, spanTarefa);
    inputEdicao.focus();
  } else {
    btnEditar.classList.remove('ativo');
    btnEditar.firstChild.setAttribute('src', './icone-editar-branco.png');
    const inputEdicao = tarefa.querySelector('input');
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
  arrayTarefas = [...tarefas.children].map(li => {
    const tarefa = { texto: li.querySelector('span').innerText };
    if (li.style.backgroundColor === '') tarefa.cor = 'rgb(255, 255, 255)';
    else tarefa.cor = li.style.backgroundColor;
    if (li.classList.contains('feita')) tarefa.feita = true;
    else tarefa.feita = false;
    return tarefa;
  });
  localStorage.tarefas = JSON.stringify(arrayTarefas);
}

const carregarTarefas = () => {
  const arrayTarefas = JSON.parse(localStorage.tarefas);
  arrayTarefas.forEach(tarefa => {
    adicionarTarefa(tarefa.texto, tarefa.feita, tarefa.cor);
  })
}

if (localStorage.tarefas) carregarTarefas();

btnAdd.addEventListener('click', event => {
  event.preventDefault();
  adicionarTarefa(campo.value);
});