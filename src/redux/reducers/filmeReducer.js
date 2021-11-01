import { actions } from "../actions";



const INITIAL_STATE = {
  filmes: '',
}

function filmeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.UPDATE_FILMES:
      return {...state, filmes: [...state.filmes, action.payload] };
    case actions.REQUEST_FILMES:
      return {...state, filmes: [...state.filmes, ...action.payload] };
    case actions.DELETE_FILMES:
      return {...state, filmes: state.filmes.filter((filme) => filme['id_filme'] !== action.payload)};
    case actions.UPDATE_ONLY_FILME:
      return {
        ...state,
        filmes: [
          ...state.filmes
          .filter((filme) => filme['id_filme'] !== action.payload['id_filme']),
          action.payload
        ].sort((a, b) => a['id_filme'] - b['id_filme']),
      }  
    default:
      return state;
  }
}

export default filmeReducer;