import { browserHistory } from 'react-router'
import {
    requestLogin,
    loginSuccessful,
    loginFailed,
    requestLogout,
    logoutSuccessful,
    invalidCreateCustomerRequest
} from './actionCreators'

import * as actionTypes from './constants'

import { CALL_API } from '../middleware/api'


export const attemptLogout = () => {
    return (dispatch) => {
        dispatch(requestLogout())
        dispatch(logoutSuccessful())
        browserHistory.push('/')
    }
}

export const fetchAccounts = (accountId,token) => ({
    [CALL_API]: {
        types: [actionTypes.REQUEST_ACCOUNTS, actionTypes.RECEIVE_ACCOUNTS, actionTypes.REQUEST_ACCOUNTS_FAILURE],
        endpoint: `/getAccounts/${accountId}`,
        method: 'GET',
        token: token
    }
})

export const fetchCustomers = (custId,token) => ({
    [CALL_API]: {
        types: [actionTypes.REQUEST_CUSTOMER, actionTypes.RECEIVE_CUSTOMER, actionTypes.REQUEST_CUSTOMER_FAILURE],
        endpoint: `/getcustomer/${custId}`,
        method: 'GET',
        token: token
    }
})

// token-auth/

export const fetchTransactions  = (accountId,token) => ({
    [CALL_API]: {
        types: [actionTypes.REQUEST_TRANSACTIONS, actionTypes.RECEIVE_TRANSACTIONS, actionTypes.REQUEST_TRANSACTIONS_FAILURE],
        endpoint: `/getTransactions/${accountId}`,
        method:'GET',
        token: token
    }
})

export const fetchTransactions18  = (accountId,token) => ({
    [CALL_API]: {
        types: [actionTypes.REQUEST_TRANSACTIONS, actionTypes.RECEIVE_TRANSACTIONS, actionTypes.REQUEST_TRANSACTIONS_FAILURE],
        endpoint: '/getPastTransactions/18months',
        method: 'PUT',
        data: { "Account_Number" : accountId },
        token: token
    }
})

export const fetchTransactionsrange  = (accountId,range,token) => ({
    [CALL_API]: {
        types: [actionTypes.REQUEST_TRANSACTIONS, actionTypes.RECEIVE_TRANSACTIONS, actionTypes.REQUEST_TRANSACTIONS_FAILURE],
        endpoint: '/getPastTransactions/range',
        method: 'PUT',
        data: { "Account_Number" : accountId,"Range":range },
        token: token
    }
})

export const submitCreateCustomerRequest = (First_Name,Last_Name,Email,Password,Username,Total_Accounts)  => ({
    [CALL_API]: {
        types: [actionTypes.CREATE_CUSTOMER_REQUEST, actionTypes.CREATE_CUSTOMER_SUCCESS, actionTypes.CREATE_CUSTOMER_FAILED],
        endpoint: '/CreateCustomerToken',
        method: 'POST',
        data: { "First_Name":First_Name,"Last_Name":Last_Name,"Email":Email,"Password":Password,"Username":Username,"Total_Accounts":Total_Accounts,"isAdmin":"False" }
    }
})

export const submitCreateAccountRequest = (Customer_ID,Account_Type,Balance,token)  => ({
    [CALL_API]: {
        types: [actionTypes.CREATE_ACCOUNT_REQUEST, actionTypes.CREATE_ACCOUNT_SUCCESS, actionTypes.CREATE_ACCOUNT_FAILED],
        endpoint: '/addAccount',
        method: 'POST',
        data: {"Customer_ID": Customer_ID, "Account_Type": Account_Type,"Balance":Balance},
        token: token
    }
})

export const fetchAllCustomers = (token) => ({
    [CALL_API]: {
        types: [actionTypes.REQUEST_CUSTOMERS, actionTypes.RECEIVE_CUSTOMERS, actionTypes.REQUEST_CUSTOMERS_FAILURE],
        endpoint: '/getcustomers',
        method: 'GET',
        token: token
    }
})

export const fetchInactiveAccounts = (token) => ({
    [CALL_API]: {
        types: [actionTypes.REQUEST_INACTIVE_ACCOUNT, actionTypes.RECEIVE_INACTIVE_ACCOUNT, actionTypes.REQUEST_INACTIVE_ACCOUNT_FAILURE],
        endpoint: '/getInactiveAdmin',
        method:'GET',
        token:token
    }
})

export const fetchActiveAccounts = (token) => ({
    [CALL_API]: {
        types: [actionTypes.REQUEST_ACTIVE_ACCOUNT, actionTypes.RECEIVE_ACTIVE_ACCOUNT, actionTypes.REQUEST_ACTIVE_ACCOUNT_FAILURE],
        endpoint: '/getActiveAdmin',
        method:'GET',
        token:token
    }
})

export const submitActivate = (Account_Num,token)  => ({
    [CALL_API]: {
        types: [actionTypes.ACTIVATE_ACCOUNT, actionTypes.ACTIVATE_ACCOUNT_SUCCESS, actionTypes.ACTIVATE_ACCOUNT_FAILED],
        endpoint: '/approveAccount',
        method: 'PUT',
        data: {"Account_Num": Account_Num},
        token: token
    }
})

export const submitDeactivate = (Account_Num,token)  => ({
    [CALL_API]: {
        types: [actionTypes.DEACTIVATE_ACCOUNT, actionTypes.DEACTIVATE_ACCOUNT_SUCCESS, actionTypes.DEACTIVATE_ACCOUNT_FAILED],
        endpoint: '/closeAccount',
        method: 'PUT',
        data: {"Account_Num": Account_Num},
        token: token
    }
})

export const submitRefund = (Account_Num,Amount,token)  => ({
    [CALL_API]: {
        types: [actionTypes.REFUND_ACCOUNT, actionTypes.REFUND_ACCOUNT_SUCCESS, actionTypes.REFUND_ACCOUNT_FAILED],
        endpoint: '/refundAccount',
        method: 'PUT',
        data: {"Account_Num": Account_Num,"Amount":Amount},
        token: token
    }
})

export const fundTransfer = (Source_Account_Num,Dest_Account_Num,Amount,Details,token)  => ({
    [CALL_API]: {
        types: [actionTypes.TRANSFER_ACCOUNT, actionTypes.TRANSFER_ACCOUNT_SUCCESS, actionTypes.TRANSFER_ACCOUNT_FAILED],
        endpoint: '/transaction/transfer',
        method: 'PUT',
        data: {"Source_Account_Num": Source_Account_Num, "Dest_Account_Num": Dest_Account_Num, "Amount": Amount, "Details": Details},
        token: token
    }
})

export const extTransfer = (Source_Account_Num,Dest_Account_Num,Amount,Details,token)  => ({
    [CALL_API]: {
        types: [actionTypes.EXT_TRANSFER_ACCOUNT, actionTypes.EXT_TRANSFER_ACCOUNT_SUCCESS, actionTypes.EXT_TRANSFER_ACCOUNT_FAILED],
        endpoint: '/transaction/send',
        method: 'PUT',
        data: {"Source_Account_Num": Source_Account_Num, "Dest_Account_Num": Dest_Account_Num, "Amount": Amount, "Details": Details},
        token: token
    }
})