import { handleActions } from 'redux-actions'

import {
  SET_PRODUCTS,
} from '../actions/products.action'

const initialState = {
  data: [],
  searchCompleted: false,
}

export default handleActions({
  [SET_PRODUCTS]: (state, action) => ({
    ...state,
    data: action.payload,
    searchCompleted: true,
  }),
}, initialState)

