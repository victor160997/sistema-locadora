import { combineReducers } from 'redux';
import clienteReducer from './clienteReducer';
import filmeReducer from './filmeReducer';

const rootReducer = combineReducers({
  locadoraDataCliente: clienteReducer,
  locadoraDataFilme: filmeReducer,
});

export default rootReducer;