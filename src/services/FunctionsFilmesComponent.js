export function renderHeaderFilmes() {
  return(
    <tr>
      <th>Id do Filme</th>
      <th>Título</th>
      <th>Classificação Indicativa</th>
      <th>Lançamento</th>
      <th>
        Excluir Filme / Atualizar Informações
      </th>
    </tr>
  );
}

export function renderFilmes(filmes, deleteFilmes, setState) {
  return filmes.map((filme) => {
    return (
      <tr key={ filme['id_filme'] }>
        <td>{ filme['id_filme'] }</td>
        <td>{ filme.titulo }</td>
        <td>{ filme['classificacao_indicativa'] }</td>
        <td>{ filme.lancamento }</td>
        <td>
          <button
            type="button"
            onClick={ () => deleteFilmes(filme['id_filme']) }
          >
            Excluir Filme
          </button>
          <button
            type="button"
            onClick={ () => {
              const born = filme.lancamento.replace(' 00:00:00', '');
              return setState({
                idFilme: filme['id_filme'],
                titulo: filme.titulo,
                classificacaoIndicativa: filme['classificacao_indicativa'],
                lancamento: born,
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

function geraIdFilmes(filmes) {
  if (filmes.length === 0) {
    return 1;
  }
  const lastId = filmes[filmes.length - 1]['id_filme'];
  return Number(lastId + 1);
}

export function adcFilmes(t) {
  const { titulo, lancamento, classificacaoIndicativa, atualizando, idFilme } = t.state;
  const { updateFilmes, filmeState, updateOnlyFilme } = t.props;
  return (
    <form>
      <label htmlFor="titulo">
        Título
        <input
          type="text"
          name="titulo"
          value={ titulo }
          onChange={ (e) => t.handleChange(e) }
        />  
      </label>
      <label htmlFor="lancamento">
        Lançamento
        <input
          type="date"
          name="lancamento"
          value={ lancamento }
          onChange={ (e) => t.handleChange(e) }
        />  
      </label>
      <label htmlFor="classificacaoIndicativa">
        Classificação Indicativa
        <input
          type="number"
          name="classificacaoIndicativa"
          value={ classificacaoIndicativa }
          onChange={ (e) => t.handleChange(e) }
        />  
      </label>
      <button
        type="button"
        onClick={
          () => {
            if (atualizando) {
              return updateOnlyFilme({ 
                id_filme: idFilme,
                titulo,
                classificacao_indicativa: classificacaoIndicativa,
                lancamento: `${lancamento} 00:00:00`
              })
            }
            return updateFilmes({ 
              id_filme: geraIdFilmes(filmeState),
              titulo,
              classificacao_indicativa: classificacaoIndicativa,
              lancamento: `${lancamento} 00:00:00`
            })
          }
        }
      >
        { atualizando ? 'Atualizar' : 'Adicionar Filme'}
      </button>
    </form>
  );
}