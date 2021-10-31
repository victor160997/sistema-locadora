import { actions } from "../actions";



const INITIAL_STATE = {
  clientes: '',
}

function clienteReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.UPDATE_CLIENTES:
      return {...state, clientes: [...state.clientes, action.payload] };
    case actions.REQUEST_CLIENTES:
      return {...state, clientes: [...state.clientes, ...action.payload] };
    case actions.DELETE_CLIENTES:
      return {...state, clientes: state.clientes.filter((cliente) => cliente['id_cliente'] !== action.payload)}  
    default:
      return state;
  }
}

export default clienteReducer;