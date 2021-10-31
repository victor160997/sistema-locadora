import { combineReducers } from 'redux';
import clienteReducer from './clienteReducer';

const rootReducer = combineReducers({
  locadoraData: clienteReducer,
});

export default rootReducer;