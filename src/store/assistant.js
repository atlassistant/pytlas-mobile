export const SET_MODE = 'assistant/setMode';

export const setMode = mode => ({
  type: SET_MODE,
  mode,
});

export const mode = state => state.assistant.mode;

const initialState = {
  mode: 'mic',
};

export default function assistantReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    default:
      return state;
  }
}
