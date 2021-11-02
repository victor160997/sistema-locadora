import { combineReducers } from 'redux';
import clienteReducer from './clienteReducer';
import filmeReducer from './filmeReducer';
import locacaoReducer from './locacaoReducer';

const rootReducer = combineReducers({
  locadoraDataCliente: clienteReducer,
  locadoraDataFilme: filmeReducer,
  locadoraDataLocacao: locacaoReducer,
});

export default rootReducer;