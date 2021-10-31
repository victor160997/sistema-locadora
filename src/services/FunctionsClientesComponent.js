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

export function renderClientes(clientes, deleteClientes, setState) {
  return clientes.map((cliente) => {
    return (
      <tr key={ cliente['id_cliente'] }>
        <td>{ cliente['id_cliente'] }</td>
        <td>{ cliente.cpf }</td>
        <td>{ cliente.nome }</td>
        <td>{ cliente['data_nascimento'] }</td>
        <td>
          <button
            type="button"
            onClick={ () => deleteClientes(cliente['id_cliente']) }
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
          () => {
            if (atualizando) {
              return updateOnlyCliente({ 
                id_cliente: idCliente,
                nome,
                cpf,
                data_nascimento: `${nascimento} 00:00:00`
              })
            }
            return updateClientes({ 
              id_cliente: geraIdClientes(clienteState),
              nome,
              cpf,
              data_nascimento: `${nascimento} 00:00:00`
            })
          }
        }
      >
        { atualizando ? 'Atualizar' : 'Adicionar Cliente'}
      </button>
    </form>
  );
}
