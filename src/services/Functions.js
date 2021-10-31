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

export function renderClientes(clientes, deleteClientes) {
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

export function adcCliente(handleChange, cpf, nascimento, nome, updateClientes, clienteState) {
  return (
    <form>
      <label htmlFor="cpf">
        CPF
        <input
          type="number"
          name="cpf"
          value={ cpf }
          onChange={ (e) => handleChange(e) }
        />  
      </label>
      <label htmlFor="cpf">
        Nascimento
        <input
          type="date"
          name="nascimento"
          value={ nascimento }
          onChange={ (e) => handleChange(e) }
        />  
      </label>
      <label htmlFor="cpf">
        Nome
        <input
          type="text"
          name="nome"
          value={ nome }
          onChange={ (e) => handleChange(e) }
        />  
      </label>
      <button
        type="button"
        onClick={
          () => updateClientes({ 
            id_cliente: geraIdClientes(clienteState),
            nome,
            cpf,
            data_nascimento: `${nascimento} 00:00:00`
          })
        }
      >
        Adicionar Cliente
      </button>
    </form>
  );
}
