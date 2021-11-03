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

function apontaClassificacao(num) {
  const n = Number(num);
  if (n === 1) return '+18 anos';
  if (n === 2) return '+16 anos';
  if (n === 3) return '+12 anos';
  if (n === 4) return 'livre';
}

function verificaSePodeExcluir(filmeId, locacoes) {
  return locacoes.some((l) => l['id_filme'] === filmeId);
}

export function renderFilmes(filmes, deleteFilmes, setState, locacaoState) {
  return filmes.map((filme, i) => {
    return (
      <tr key={ filme['id_filme'] } className={ i % 2 === 0 ? 'back-line' : ''}>
        <td>{ filme['id_filme'] }</td>
        <td>{ filme.titulo }</td>
        <td>
          { `ID ${filme['classificacao_indicativa']} = ${apontaClassificacao(filme['classificacao_indicativa'])}` }
        </td>
        <td>{ filme.lancamento }</td>
        <td>
          <button
            type="button"
            onClick={ () => verificaSePodeExcluir(filme['id_filme'], locacaoState)
              ? global.alert('Esse filme possui histórico de locação, para excluir é necessário que a locação seja excluída primeiro!')
              : deleteFilmes(filme['id_filme']) }
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

function vererificaInfos(infos, filmeState) {
  if (infos.classificacao_indicativa < 1
    || infos.classificacao_indicativa > 4) {
    return {
      status: false,
      msg: 'Classificação indicativa inválida, selecione 1 para +18, 2 para +16, 3 para +12, 4 para livre!'
    };
  }
  if(infos.titulo.length < 3) {
    return {
      status: false,
      msg: 'Título do filme inválido!'
    };
  }
  const verificaSeFilmeExiste = filmeState
    .some((filme) => filme.titulo === infos.titulo
      && filme.lancamento === infos.lancamento
      && Number(filme.classificacao_indicativa) === Number(infos.classificacao_indicativa));
  if (verificaSeFilmeExiste === true) {
    return {
      status: false,
      msg: 'Esse filme já está cadastrado em nosso sistema!'
    };
  }  
  const dataLancamento = `${infos.lancamento.replace(' 00:00:00', 'T00:00:00')}-03:00`;
  const compare = (new Date() - new Date(dataLancamento))/ 1000 / 60 / 60;
  if(infos.lancamento === ' 00:00:00'
    || compare < 0) {
    return {
      status: false,
      msg: 'Data de lançamento inválida!'
    };
  }
  return {
    status: true
  }
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
        <select
          name="classificacaoIndicativa"
          value={ classificacaoIndicativa }
          onChange={ (e) => t.handleChange(e) }
        >
          <option value="1">+18 anos</option>
          <option value="2">+16 anos</option>
          <option value="3">+12 anos</option>
          <option value="1">Livre</option>
        </select>
      </label>
      <button
        type="button"
        onClick={
          () => {
            if (atualizando) {
              const infos = { 
                id_filme: idFilme,
                titulo,
                classificacao_indicativa: classificacaoIndicativa,
                lancamento: `${lancamento} 00:00:00`
              };
              const verifica = vererificaInfos(infos, filmeState);
              return verifica.status ? updateOnlyFilme(infos) : global.alert(verifica.msg);
            }
            const infos = { 
              id_filme: geraIdFilmes(filmeState),
              titulo,
              classificacao_indicativa: classificacaoIndicativa,
              lancamento: `${lancamento} 00:00:00`
            };
            const verifica = vererificaInfos(infos, filmeState);
            return verifica.status ? updateFilmes(infos) : global.alert(verifica.msg);
          }
        }
      >
        { atualizando ? 'Atualizar' : 'Adicionar Filme'}
      </button>
    </form>
  );
}