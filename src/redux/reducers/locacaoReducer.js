import { actions } from "../actions";



const INITIAL_STATE = {
  locacoes: '',
}

function locacaoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.UPDATE_LOCACOES:
      return {...state, locacoes: [...state.locacoes, action.payload] };
    case actions.REQUEST_LOCACOES:
      return {...state, locacoes: [...state.locacoes, ...action.payload] };
    case actions.DELETE_LOCACOES:
      return {...state, locacoes: state.locacoes.filter((locacao) => locacao['id_locacao'] !== action.payload)};
    case actions.UPDATE_ONLY_LOCACAO:
      return {
        ...state,
        locacoes: [
          ...state.locacoes
          .filter((locacao) => locacao['id_locacao'] !== action.payload['id_locacao']),
          action.payload
        ].sort((a, b) => a['id_locacao'] - b['id_locacao']),
      }  
    default:
      return state;
  }
}

export default locacaoReducer;