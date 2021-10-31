export const actions = {
  REQUEST_CLIENTES: 'REQUEST_CLIENTES',
  REQUEST_FILMES: 'REQUEST_FILMES',
  REQUEST_LOCACOES: 'REQUEST_LOCACOES',
  UPDATE_CLIENTES: 'UPDATE_CLIENTES',
  UPDATE_FILMES: 'UPDATE_FILMES',
  UPDATE_LOCACOES: 'UPDATE_CLIENTES'
};

export const getClientesAction = (payload) => ({
  type: actions.REQUEST_CLIENTES, payload,
});

export const getFilmesAction = (payload) => ({
  type: actions.REQUEST_FILMES, payload,
});

export const getLocacoesAction = (payload) => ({
  type: actions.REQUEST_Locacoes, payload,
});
