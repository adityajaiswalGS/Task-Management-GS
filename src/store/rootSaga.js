import { all } from 'redux-saga/effects';
import { watchAuth } from '../features/auth/authSaga';
import { watchTasks } from '../features/tasks/tasksSaga';  // ← Must match path & named import

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchTasks(),  // ← Now defined
  ]);
}