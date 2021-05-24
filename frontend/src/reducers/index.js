import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import * as ActionTypes from 'actions/constants'
import accounts from './accounts'
import account from './accounts'
import customer from './customer'
import getCustomer from './getCustomer'
import getCustomers from './getCustomers'
import transactions from './transactions'
import transactions18 from './transactions18'
import transactionsrange from './transactionsrange'
import getInactiveAccounts from './getInactiveAccounts'
import getActiveAccounts from './getActiveAccounts'

const errorMessage = (state = null, action) => {
  const { type, error } = action
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }
  return state
}

const rootReducer = combineReducers({
  errorMessage,
  routing,
  accounts,
  account,
  customer,
  getCustomer,
  getCustomers,
  getInactiveAccounts,
  getActiveAccounts,
  transactions,
  transactions18,
  transactionsrange,
})

export default rootReducer
