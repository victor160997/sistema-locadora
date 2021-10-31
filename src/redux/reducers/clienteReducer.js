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
      return {...state, clientes: state.clientes.filter((cliente) => cliente['id_cliente'] !== action.payload)};
    case actions.UPDATE_ONLY_CLIENTE:
      return {
        ...state,
        clientes: [
          ...state.clientes
          .filter((cliente) => cliente['id_cliente'] !== action.payload['id_cliente']),
          action.payload
        ].sort((a, b) => a['id_cliente'] - b['id_cliente']),
      }    
    default:
      return state;
  }
}

export default clienteReducer;