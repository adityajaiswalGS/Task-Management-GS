import { takeLatest, put, call } from 'redux-saga/effects';
import { generateFakeToken } from '../../utils/fakeJWT';
import { loginSuccess, logout } from './authSlice';

function* loginSaga(action) {
  try {
    const { username } = action.payload;
    const token = yield call(generateFakeToken, username);

    const user = {
      username,
      name: `User ${username}`,
      email: `${username}@example.com`,
      avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
    };

    yield put(loginSuccess({ token, user }));
  } catch (error) {
    console.error('Login failed:', error);
  }
}

function* logoutSaga() {
  yield put(logout());
}

export function* watchAuth() {
  yield takeLatest('auth/loginRequest', loginSaga);
  yield takeLatest('auth/logoutRequest', logoutSaga);
}