import { createStore, combineReducers } from 'redux'

import reducers from './reducers'

const reducersCombined = combineReducers(reducers)
const store = createStore(reducersCombined)

export default store
