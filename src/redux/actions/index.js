export const actions = {
  REQUEST_CLIENTES: 'REQUEST_CLIENTES',
  UPDATE_CLIENTES: 'UPDATE_CLIENTES',
  DELETE_CLIENTES: 'DELETE_CLIENTES',
  UPDATE_ONLY_CLIENTE: 'UPDATE_ONLY_CLIENTE',
  REQUEST_FILMES: 'REQUEST_FILMES',
  REQUEST_LOCACOES: 'REQUEST_LOCACOES',
  UPDATE_FILMES: 'UPDATE_FILMES',
  UPDATE_LOCACOES: 'UPDATE_CLIENTES',
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

export const updateClientesAction = (payload) => ({
  type: actions.UPDATE_CLIENTES, payload,
});

export const deleteClientesAction = (payload) => ({
  type: actions.DELETE_CLIENTES, payload,
});

export const updateOnlyClienteAction = (payload) => ({
  type: actions.UPDATE_ONLY_CLIENTE, payload,
});

