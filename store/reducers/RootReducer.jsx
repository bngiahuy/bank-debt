'use client'
import { getListCustomer } from 'actions/customer/Customer'

const initState = {
  user:
    typeof window !== 'undefined'
      ? localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : {}
      : {},
}

const RootReducer = (state = initState, action) => {
  switch (action.type) {
    case '':
      break
    case 'SET_USER':
      state.user = action.payload
      return state
    default:
      return state
  }

  return state
}

export default RootReducer
