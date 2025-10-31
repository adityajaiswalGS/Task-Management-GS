import { takeLatest, put, call, all } from 'redux-saga/effects';  // Ensure imports are here
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../../services/api';
import {
  setTasks,
  addTask,
  updateTaskInList,
  removeTask,
  setLoading,
  setError,
} from './tasksSlice';
import { enqueueSnackbar } from 'notistack';
import { createSuccess,deleteSuccess } from './tasksSlice';

function* fetchTasksSaga() {
  try {
    yield put(setLoading());
    const response = yield call(fetchTasks);
    yield put(setTasks(response.data));
  } catch (error) {
    yield put(setError(error.message));
    console.error('Fetch tasks failed:', error);
  }
}

function* createTaskSaga(action) {
  try {
    const response = yield call(createTask, action.payload);
    yield put(addTask(response.data));
    yield put(createSuccess());
  } catch (error) {
    yield put(setError(error.message));
    console.error('Create task failed:', error);
  }
}

function* updateTaskSaga(action) {
  try {
    const response = yield call(updateTask, action.payload.id, action.payload);
    yield put(updateTaskInList(response.data));
    yield put(updateSuccess());
  } catch (error) {
    yield put(setError(error.message));
    console.error('Update task failed:', error);
  }
}

function* deleteTaskSaga(action) {
  try {
    yield put(deleteSuccess());
    yield call(deleteTask, action.payload);
    yield put(removeTask(action.payload));

  } catch (error) {
    yield put(setError(error.message));
    console.error('Delete task failed:', error);
  }
}

// NAMED EXPORT – MUST HAVE 'export' HERE
export function* watchTasks() {
  yield takeLatest('tasks/fetchRequest', fetchTasksSaga);
  yield takeLatest('tasks/createRequest', createTaskSaga);
  yield takeLatest('tasks/updateRequest', updateTaskSaga);
  yield takeLatest('tasks/deleteRequest', deleteTaskSaga);
}