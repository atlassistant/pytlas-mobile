import * as actions from './actions';
import * as getters from './getters';

const initialState = {
  serverUrl: '',
  token: '',
};

export {
  actions,
  getters,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SELECT_SERVER:
      return {
        ...state,
        serverUrl: action.url,
      };
    case actions.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}
