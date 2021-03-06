export function renderHeaderLocacoes() {
  return(
    <tr>
      <th>Id da Locação</th>
      <th>Id do Cliente</th>
      <th>Id do Filme</th>
      <th>Data da Locação</th>
      <th>Data da Devolução</th>
      <th>Status da locação</th>
      <th>
        Excluir Locação / Atualizar Informações
      </th>
    </tr>
  );
}

function ajustaData(date) {
  let dataAjustada = [];
  date.split('').forEach((d, i) => {
      if (i < 10) {
        dataAjustada.push(d);
      }
    });
  return dataAjustada.join('');
}

function localizaCliente(idCliente, clientes) {
  if (clientes.length > 0 && idCliente) {
    return clientes.find((c) => c['id_cliente'] === idCliente).nome;
  }
  return undefined;
}

function localizaFilme(idFilme, filmes) {
  if (filmes.length > 0 && idFilme) {
    return filmes.find((f) => f['id_filme'] === idFilme).titulo;
  }
  return undefined;
}

function formulaDataPadrao(data) {
  const arrayDateTime = data.split(' ');
  return `${arrayDateTime[0]}T${arrayDateTime[1]}-03:00`;
}

function verificaFilmeAlugado(locacoes, idFilme, idCliente) {
  if (idCliente) {
    const alugado = locacoes.some((locacao) => Number(locacao['id_filme']) === (Number(idFilme))
      && locacao['id_cliente'] === idCliente
      && new Date(formulaDataPadrao(locacao['data_devolucao'])) -  new Date() > 0);
      return alugado;
  }
  const alugado = locacoes
    .some((locacao) => Number(locacao['id_filme']) === Number(idFilme)
      && new Date(formulaDataPadrao(locacao['data_devolucao'])) -  new Date() > 0);
  return alugado;
}


export function renderLocacoes(locacoes, deleteLocacoes, setState, filmeState, clienteState) {
  if (filmeState.length > 0 && clienteState.length > 0) {
    return locacoes.map((locacao, i) => {
      return (
        <tr key={ locacao['id_locacao'] } className={ i % 2 === 0 ? 'back-line' : ''}>
          {/* { console.log(localizaFilme(3, filmeState)) } */}
          <td>{ locacao['id_locacao'] }</td>
          <td>{ `${locacao['id_cliente']} - ${localizaCliente(locacao['id_cliente'], clienteState)}` }</td>
          <td>{ `${locacao['id_filme']} - ${localizaFilme(locacao['id_filme'], filmeState)}` }</td>
          <td>{ locacao['data_locacao'] }</td>
          <td>{ locacao['data_devolucao'] }</td>
          <td>{ verificaFilmeAlugado(locacoes, locacao['id_filme']) ? 'Em andamento' : 'Finalizada' }</td>
          <td>
            <button
              type="button"
              onClick={ () => deleteLocacoes(locacao['id_locacao']) }
            >
              Excluir Locação
            </button>
            <button
              type="button"
              onClick={ () => {
                const locacaoDate = ajustaData(locacao['data_locacao']);
                const devolucaoDate = ajustaData(locacao['data_devolucao']);
                return setState({
                  idLocacao: locacao['id_locacao'],
                  idCliente: locacao['id_cliente'],
                  idFilme: locacao['id_filme'],
                  dataLocacao: locacaoDate,
                  dataDevolucao: devolucaoDate,
                  atualizando: true,
                })
              } }
            >
              Atualizar Informações
            </button> 
          </td>
        </tr>
      );
    })
  }
}

function geraIdLocacoes(locacoes) {
  if (locacoes.length === 0) {
    return 1;
  }
  const lastId = locacoes[locacoes.length - 1]['id_locacao'];
  return Number(lastId + 1);
}

const dataAtual = new Date();
const  hr = dataAtual.getHours() < 10 ? `0${dataAtual.getHours()}` : dataAtual.getHours();
const min = dataAtual.getMinutes() < 10 ? `0${dataAtual.getMinutes()}` : dataAtual.getMinutes();
const sec = dataAtual.getSeconds() < 10 ? `0${dataAtual.getSeconds()}` : dataAtual.getSeconds();

function formulaData(data) {
  const  hr = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours();
  const min = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes();
  const sec = data.getSeconds() < 10 ? `0${data.getSeconds()}` : data.getSeconds();
  const year = data.getFullYear();
  const month = data.getMonth() < 9 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
  const day = data.getDay() < 10 ? `0${data.getDay()}` : data.getDay();
  const dateTime = `${year}-${month}-${day} ${hr}:${min}:${sec}`;
  return dateTime;
}

const devolucaoLancamento = () => {
  const ndt = new Date();
  const dtdev =  new Date(ndt.setDate(dataAtual.getDate()+2));
  return formulaData(dtdev);
}

const devolucaoNormal = () => {
  const ndt = new Date();
  const dtdev =  new Date(ndt.setDate(dataAtual.getDate()+3));
  return formulaData(dtdev);
}

function verificaLancamento(idFilme, filmes) {
  const valido = filmes.some((filme) => filme['id_filme'] === idFilme);
  if (valido) {
    const filme = filmes.find((filme) => filme['id_filme'] === idFilme);
    const lancamento = filme.lancamento.replace(' 00:00:00', '');
    const tempoDoLancamento = (new Date() - new Date(`${lancamento}T00:00:00-03:00`))/1000/60/60/24/30;
    return tempoDoLancamento < 6 ? true : false;
  }
  return undefined;
}

function renderOptionsClientes(clientes) {
  return clientes.map((cliente) => (
    <option value={cliente['id_cliente']} key={cliente['id_cliente']}>
      {`Id: ${cliente['id_cliente']} - ${cliente.nome}`}
    </option>
  ));
}

function renderOptionsFilmes(filmes, locacoes) {
  return filmes.map((filme) => (
    <option
      value={filme['id_filme']}
      key={filme['id_filme']}
      disabled = { verificaFilmeAlugado (locacoes, filme['id_filme']) }
    >
      {`Id: ${filme['id_filme']} - ${filme.titulo}`}
    </option>
  ));
}

function verificaInputs(filmes, clientes, infos, locacoes, idCliente) {
  const filme = filmes.some((filme) => filme['id_filme'] === infos['id_filme']);
  const cliente = clientes.some((cliente) => cliente['id_cliente'] === infos['id_cliente']);
  const alugado = verificaFilmeAlugado (locacoes, infos['id_filme'], idCliente);
  console.log(alugado);
  if (alugado === true) {
    return {
      status: false,
      msg: 'O filme escolhido já está alugado!',
    };
  }
  if (filme === false || cliente === false) {
    return {
      status: false,
      msg: 'Id do cliente ou Id do filme não é válido!',
    };
  }
  return { status: true };
}

export function adcLocacoes(t) {
  const { idLocacao, idCliente, idFilme, dataLocacao, dataDevolucao, atualizando } = t.state;
  const { updateLocacoes, locacaoState, updateOnlyLocacao, clienteState, filmeState } = t.props;
  return (
    <form>
      <label htmlFor="idCliente">
        Id do cliente
        <input
          type="number"
          name="idCliente"
          value={ idCliente }
          onChange={ (e) => t.handleChange(e) }
        />
        <select
          name="idCliente"
          value={ idCliente }
          onChange={ (e) => t.handleChange(e) }
        >
          <option value=''>Escolha o cliente</option>
          { renderOptionsClientes(clienteState) }
        </select>
      </label>
      <label htmlFor="idFilme">
        Id do Filme
        <input
          type="number"
          name="idFilme"
          value={ idFilme }
          onChange={ (e) => t.handleChange(e) }
        />
        <select
          name="idFilme"
          value={ idFilme }
          onChange={ (e) => t.handleChange(e) }
        >
          <option value=''>Escolha o filme</option>
          { renderOptionsFilmes(filmeState, locacaoState) }
        </select>
      </label>
      { atualizando && <label htmlFor="dataLocacao">
        Data da Locação
        <input
          type="date"
          name="dataLocacao"
          value={ dataLocacao }
          onChange={ (e) => t.handleChange(e) }
        />
      </label> }
      { atualizando && <label htmlFor="dataDevolucao">
        Data da Devolução
        <input
          type="date"
          name="dataDevolucao"
          value={ dataDevolucao }
          onChange={ (e) => t.handleChange(e) }
        />  
      </label> }
      <button
        type="button"
        onClick={
          () => {
            if (atualizando) {
              const infos = {
                id_locacao: idLocacao,
                id_cliente: Number(idCliente),
                id_filme: Number(idFilme),
                data_locacao: `${dataLocacao} ${hr}:${min}:${sec}`,
                data_devolucao: `${dataDevolucao} ${hr}:${min}:${sec}`,
              };
              const valido = verificaInputs(filmeState, clienteState, infos, locacaoState, infos['id_cliente']);
              return valido.status ? updateOnlyLocacao(infos) : global.alert(valido.msg);
            }
            const infos = { 
              id_locacao: geraIdLocacoes(locacaoState),
              id_cliente: Number(idCliente),
              id_filme: Number(idFilme),
              data_locacao: formulaData(new Date()),
              data_devolucao: verificaLancamento(Number(idFilme), filmeState) ? devolucaoLancamento() : devolucaoNormal(),
            };
            const valido = verificaInputs(filmeState, clienteState, infos, locacaoState);
            return valido.status ? updateLocacoes(infos) : global.alert(valido.msg);
          }
        }
      >
        { atualizando ? 'Atualizar' : 'Adicionar Locação'}
      </button>
    </form>
  );
}
