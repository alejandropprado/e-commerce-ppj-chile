import { handleActions } from 'redux-actions'
import _ from 'lodash'

import {
  SET_CART,
  ADD_ITEM_CART,
  DELETE_ITEM_CART,
  UPDATE_ITEM_CART,
  REMOVE_CART,
} from '../actions/cart.action'

const initialState = {
  data: [],
  searchCompleted: false,
}

export default handleActions({
  [SET_CART]: (state, action) => ({
    ...state,
    data: action.payload,
    searchCompleted: true,
  }),
  [ADD_ITEM_CART]: (state, { payload }) => {
    const cartKeyed = _.keyBy(state.data, 'id')

    return {
      ...state,
      data: cartKeyed[payload.id]
        ? state.data.map(item => item.id === payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item)
        : state.data.concat(payload),
    }
  },
  [DELETE_ITEM_CART]: (state, { payload }) => {
    const cartKeyed = _.keyBy(state.data, 'id')
    const item = cartKeyed[payload.id] || { quantity: 0 }

    if (item?.quantity - 1 <= 0 || payload.quantity <= 0) {
      return {
        ...state,
        data: state.data.filter(item => item.id !== payload.id),
      }
    }

    return {
      ...state,
      data: state.data.map(item => item.id === payload.id
        ? { ...item, quantity: item.quantity - 1 }
        : item),
    }
  },
  [UPDATE_ITEM_CART]: (state, { payload: itemToUpdate }) => {
    console.log({ itemToUpdate })
    const cartKeyed = _.keyBy(state.data, 'id')
    const itemPayload = cartKeyed[itemToUpdate.id]

    if (itemPayload && itemToUpdate.quantity <= 0) {
      return {
        ...state,
        data: state.data.filter(item => item.id !== itemPayload.id)
      }
    }

    return {
      ...state,
      data: state.data
        .map(item => item.id === itemToUpdate.id
          ? itemToUpdate
          : item)
    }
  },
  [REMOVE_CART]: state => ({
    ...state,
    data: [],
  }),
}, initialState)
