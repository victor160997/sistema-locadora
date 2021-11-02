export const actions = {
  /* ACTIONS CLIENTES */
  REQUEST_CLIENTES: 'REQUEST_CLIENTES',
  UPDATE_CLIENTES: 'UPDATE_CLIENTES',
  DELETE_CLIENTES: 'DELETE_CLIENTES',
  UPDATE_ONLY_CLIENTE: 'UPDATE_ONLY_CLIENTE',
  /* ACTIONS FILMES */
  REQUEST_FILMES: 'REQUEST_FILMES',
  UPDATE_FILMES: 'UPDATE_FILMES',
  DELETE_FILMES: 'DELETE_FILMES',
  UPDATE_ONLY_FILME: 'UPDATE_ONLY_FILME',
  /* ACTIONS FILMES */
  REQUEST_LOCACOES: 'REQUEST_LOCACOES',
  UPDATE_LOCACOES: 'UPDATE_LOCACOES',
  DELETE_LOCACOES: 'DELETE_LOCACOES',
  UPDATE_ONLY_LOCACAO: 'UPDATE_ONLY_LOCACAO',
};

/* ACTIONS CLIENTES */
/* -------------------------------------------------------------------- */
export const getClientesAction = (payload) => ({
  type: actions.REQUEST_CLIENTES, payload,
});

export const updateClientesAction = (payload) => ({
  type: actions.UPDATE_CLIENTES, payload,
});

export const deleteClientesAction = (payload) => ({
  type: actions.DELETE_CLIENTES, payload,
});

export const updateOnlyClienteAction = (payload) => ({
  type: actions.UPDATE_ONLY_CLIENTE, payload,
});

/*  TERMINA ACTIONS CLIENTES */
/* -------------------------------------------------------------------- */
/* ACTIONS FILMES */

export const getFilmesAction = (payload) => ({
  type: actions.REQUEST_FILMES, payload,
});

export const updateFilmesAction = (payload) => ({
  type: actions.UPDATE_FILMES, payload,
});

export const deleteFilmesAction = (payload) => ({
  type: actions.DELETE_FILMES, payload,
});


export const updateOnlyFilmeAction = (payload) => ({
  type: actions.UPDATE_ONLY_FILME, payload,
});

/* TERMINA ACTIONS FILMES */
/* -------------------------------------------------------------------- */
/* ACTIONS LOCACOES */

export const getLocacoesAction = (payload) => ({
  type: actions.REQUEST_LOCACOES, payload,
});

export const updateLocacoesAction = (payload) => ({
  type: actions.UPDATE_LOCACOES, payload,
});

export const deleteLocacoesAction = (payload) => ({
  type: actions.DELETE_LOCACOES, payload,
});

export const updateOnlyLocacaoAction = (payload) => ({
  type: actions.UPDATE_ONLY_LOCACAO, payload,
});

/* TERMINA ACTIONS LOCACOES */
/* -------------------------------------------------------------------- */



