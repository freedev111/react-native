import { put, takeLatest, all, call } from 'redux-saga/effects'
import axios from 'axios'

function* fetchList() {
    try {
        const res = yield call(axios.get, 'https://api.reddit.com/r/pics/hot.json')
        yield put({ type: 'GET_LIST_SUCCESS', payload: res.data })
    } catch(error) {
        yield put({ type: 'GET_LIST_FAIL'});
    }
}

function* actionWatcher() {
    yield takeLatest('GET_LIST', fetchList)
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ])
}