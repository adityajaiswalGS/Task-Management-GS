import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fetchTasks, createTask, updateTask, deleteTask } from '../../services/api';
import {
  setTasks,
  addTask,
  updateTaskInList,
  removeTask,
  setLoading,
  setError,
  createSuccess,
  updateSuccess,
  deleteSuccess,
  toggleBookmarkSuccess,
  optimisticBookmark
} from './tasksSlice';

// === WORKER SAGAS ===

function* fetchTasksSaga() {
  try {
    yield put(setLoading());
    const response = yield call(fetchTasks);
    yield put(setTasks(response.data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* createTaskSaga(action) {
  try {
    const response = yield call(createTask, action.payload);
    yield put(addTask(response.data));
    yield put(createSuccess());
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* updateTaskSaga(action) {
  try {
    const { id, ...data } = action.payload;
    const response = yield call(updateTask, id, data);
    yield put(updateTaskInList(response.data));
    yield put(updateSuccess());
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* deleteTaskSaga(action) {
  try {
    yield call(deleteTask, action.payload);
    yield put(removeTask(action.payload));
    yield put(deleteSuccess());
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* toggleBookmarkSaga(action) {
  try {
    const taskId = action.payload;
    const tasks = yield select(state => state.tasks.tasks);
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newBookmarked = !task.bookmarked;

    // Step 1: Instant UI update
    yield put(optimisticBookmark(taskId));

    // Step 2: Save to API
    const updatedTask = { ...task, bookmarked: newBookmarked };
    const response = yield call(updateTask, taskId, updatedTask);

    // Step 3: Confirm
    yield put(toggleBookmarkSuccess({
      id: taskId,
      bookmarked: response.data.bookmarked,
    }));
  } catch (error) {
    // Revert on fail
    yield put(optimisticBookmark(action.payload));
    yield put(setError('Bookmark failed'));
  }
}

// === WATCHER ===
export function* watchTasks() {
  yield takeLatest('tasks/fetchRequest', fetchTasksSaga);
  yield takeLatest('tasks/createRequest', createTaskSaga);
  yield takeLatest('tasks/updateRequest', updateTaskSaga);
  yield takeLatest('tasks/deleteRequest', deleteTaskSaga);
  yield takeLatest('tasks/toggleBookmarkRequest', toggleBookmarkSaga);
}