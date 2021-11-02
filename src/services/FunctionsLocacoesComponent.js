export function renderHeaderLocacoes() {
  return(
    <tr>
      <th>Id da Locação</th>
      <th>Id do Cliente</th>
      <th>Id do Filme</th>
      <th>Data da Locação</th>
      <th>Data da Devolução</th>
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

export function renderLocacoes(locacoes, deleteLocacoes, setState) {
  return locacoes.map((locacao) => {
    return (
      <tr key={ locacao['id_locacao'] }>
        <td>{ locacao['id_locacao'] }</td>
        <td>{ locacao['id_cliente'] }</td>
        <td>{ locacao['id_filme'] }</td>
        <td>{ locacao['data_locacao'] }</td>
        <td>{ locacao['data_devolucao'] }</td>
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
  const filme = filmes.find((filme) => filme['id_filme'] === idFilme);
  const lancamento = filme.lancamento.replace(' 00:00:00', '');
  const tempoDoLancamento = (new Date() - new Date(`${lancamento}T00:00:00-03:00`))/1000/60/60/24/30;
  return tempoDoLancamento < 6 ? true : false;
}

function renderOptionsClientes(clientes) {
  return clientes.map((cliente) => (
    <option value={cliente['id_cliente']} key={cliente['id_cliente']}>
      {`Id: ${cliente['id_cliente']} - ${cliente.nome}`}
    </option>
  ));
}

function renderOptionsFilmes(filmes) {
  return filmes.map((filme) => (
    <option value={filme['id_filme']} key={filme['id_filme']}>
      {`Id: ${filme['id_filme']} - ${filme.titulo}`}
    </option>
  ));
}

export function adcLocacoes(t) {
  const { idLocacao, idCliente, idFilme, dataLocacao, dataDevolucao, atualizando } = t.state;
  const { updateLocacoes, locacaoState, updateOnlyLocacao, clienteState, filmeState } = t.props;
  return (
    <form>
      { verificaLancamento(1, filmeState) }
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
          { renderOptionsFilmes(filmeState) }
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
              return updateOnlyLocacao({
                id_locacao: idLocacao,
                id_cliente: Number(idCliente),
                id_filme: Number(idFilme),
                data_locacao: `${dataLocacao} ${hr}:${min}:${sec}`,
                data_devolucao: `${dataDevolucao} ${hr}:${min}:${sec}`,
              })
            }
            return updateLocacoes({ 
              id_locacao: geraIdLocacoes(locacaoState),
              id_cliente: Number(idCliente),
              id_filme: Number(idFilme),
              data_locacao: formulaData(new Date()),
              data_devolucao: verificaLancamento(Number(idFilme), filmeState) ? devolucaoLancamento() : devolucaoNormal(),
            })
          }
        }
      >
        { atualizando ? 'Atualizar' : 'Adicionar Locação'}
      </button>
    </form>
  );
}