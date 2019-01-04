import axios from 'axios';
import * as getters from './getters';

export const SELECT_SERVER = 'auth/SelectServer';
export const SET_TOKEN = 'auth/SetToken';

/**
 * Store the server url
 * @param {String} url URL to connect to
 */
export const selectServer = url => ({
  type: SELECT_SERVER,
  url,
});

/**
 * Logs the user in and store its token
 * @param {String} username Username
 * @param {String} password Password
 */
export const login = (username, password) => async (dispatch, getState) => {
  const url = `${getters.serverUrl(getState())}/api/token`;

  const r = await axios.post(url, {
    username,
    password,
  }, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  dispatch({
    type: SET_TOKEN,
    token: r.data.access,
  });
};
