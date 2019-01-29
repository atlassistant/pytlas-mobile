import { PermissionsAndroid } from 'react-native';

export const SET_MODE = 'assistant/setMode';
export const SET_MIC_PERMISSIONS = 'assistant/setMicPermissions';

export const setMode = mode => ({
  type: SET_MODE,
  mode,
});

export const setMicPermissions = result => ({
  type: SET_MIC_PERMISSIONS,
  result,
});

export const mode = state => state.assistant.mode;
export const micAvailable = state => state.assistant.micAvailable;

const initialState = {
  mode: 'mic',
  micAvailable: false,
};

export default function assistantReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    case SET_MIC_PERMISSIONS:
      return {
        ...state,
        micAvailable: action.result === PermissionsAndroid.RESULTS.GRANTED,
        mode: action.result !== PermissionsAndroid.RESULTS.GRANTED ? 'text' : state.mode,
      };
    default:
      return state;
  }
}
