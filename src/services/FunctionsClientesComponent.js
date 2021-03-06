export function renderHeaderClientes() {
  return(
    <tr>
      <th>Id do Cliente</th>
      <th>CPF</th>
      <th>Nome</th>
      <th>Data de Nascimento</th>
      <th>
        Excluir Cliente / Atualizar Informações
      </th>
    </tr>
  );
}

function verificaSePodeExcluir(clienteId, locacoes) {
  return locacoes.some((l) => l['id_cliente'] === clienteId);
}

function verificaSeExisteNoSistema(cpf, clientes) {
  return clientes.some((cliente) => Number(cliente.cpf) === Number(cpf));
}

export function renderClientes(clientes, deleteClientes, setState, locacaoState) {
  return clientes.map((cliente, i) => {
    return (
      <tr key={ cliente['id_cliente'] } className={ i % 2 === 0 ? 'back-line' : ''}>
        <td>{ cliente['id_cliente'] }</td>
        <td>{ cliente.cpf }</td>
        <td>{ cliente.nome }</td>
        <td>{ cliente['data_nascimento'] }</td>
        <td>
          <button
            type="button"
            onClick={ () => verificaSePodeExcluir(cliente['id_cliente'], locacaoState)
            ? global.alert('Esse cliente possui locação em andamento, para excluir é necessário que a(s) locação seja excluída primeiro!')
            : deleteClientes(cliente['id_cliente']) }
          >
            Excluir Cliente
          </button>
          <button
            type="button"
            onClick={ () => {
              const born = cliente['data_nascimento'].replace(' 00:00:00', '');
              return setState({
                cpf: cliente.cpf ,
                nascimento: born,
                idCliente: cliente['id_cliente'],
                nome: cliente.nome,
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

function geraIdClientes(clientes) {
  if (clientes.length === 0) {
    return 1;
  }
  const lastId = clientes[clientes.length - 1]['id_cliente'];
  return Number(lastId + 1);
}

const date = new Date();

function vererificaInfos(infos, clientes) {
  if (infos.cpf.length !== 11) {
    return {
      status: false,
      msg: 'Número de CPF inválido!'
    };
  }
  if (verificaSeExisteNoSistema(infos.cpf, clientes) === true) {
    return {
      status: false,
      msg: 'Esse CPF já está cadastrado no nosso sistema!'
    };
  }
  if(infos.nome.length < 3) {
    return {
      status: false,
      msg: 'Nome do cliente inválido!'
    };
  }
  if(infos.data_nascimento === ' 00:00:00'
    || infos.data_nascimento.split('-')[0] < 1900
    || date.getFullYear() - infos.data_nascimento.split('-')[0] <= 15) {
    return {
      status: false,
      msg: 'Favor inserir data de nascimento válida, lembrando que um cliente deve ter no mínimo 16 anos!'
    };
  }
  return {
    status: true
  }
}

export function adcCliente(t) {
  const { cpf, nascimento, nome, atualizando, idCliente } = t.state;
  const { updateClientes, clienteState, updateOnlyCliente } = t.props;
  return (
    <form>
      <label htmlFor="cpf">
        CPF
        <input
          type="number"
          name="cpf"
          value={ cpf }
          onChange={ (e) => t.handleChange(e) }
        />  
      </label>
      <label htmlFor="cpf">
        Nascimento
        <input
          type="date"
          name="nascimento"
          value={ nascimento }
          onChange={ (e) => t.handleChange(e) }
        />  
      </label>
      <label htmlFor="cpf">
        Nome
        <input
          type="text"
          name="nome"
          value={ nome }
          onChange={ (e) => t.handleChange(e) }
        />  
      </label>
      <button
        type="button"
        onClick={
          (e) => {
            e.preventDefault();
            if (atualizando) {
              const infos = { 
                id_cliente: idCliente,
                nome,
                cpf,
                data_nascimento: `${nascimento} 00:00:00`
              };
              const verifica = vererificaInfos(infos, clienteState);
              return verifica.status ? updateOnlyCliente(infos)
                : global.alert(verifica.msg);
            }
            const infos = { 
              id_cliente: geraIdClientes(clienteState),
              nome,
              cpf,
              data_nascimento: `${nascimento} 00:00:00`
            };
            const verifica = vererificaInfos(infos, clienteState);
              return verifica.status ? updateClientes(infos)
                : global.alert(verifica.msg);
          }
        }
      >
        { atualizando ? 'Atualizar' : 'Adicionar Cliente'}
      </button>
    </form>
  );
}
