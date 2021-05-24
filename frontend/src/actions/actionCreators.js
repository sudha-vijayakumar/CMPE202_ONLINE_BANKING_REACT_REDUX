import * as types from './constants'

export const resetErrorMessage = () => ({
    type: types.RESET_ERROR_MESSAGE
})

export const requestLogin = credentials => ({
    type: types.REQUEST_LOGIN,
    credentials
})

export const loginSuccessful = () => ({
    type: types.REQUEST_LOGIN_SUCCESS
})

export const loginFailed = validationResult => ({
    type: types.REQUEST_LOGIN_FAILURE,
    validationResult
})

export const requestLogout = () => ({
    type: types.REQUEST_LOGOUT
})

export const logoutSuccessful = () => ({
    type: types.REQUEST_LOGOUT_SUCCESS
})

export const requestAccounts = () => ({
    type: types.REQUEST_ACCOUNTS
})

export const receiveAccounts = (accounts) => ({
    type: types.RECEIVE_ACCOUNTS,
    accounts
})

export const requestCustomer = () => ({
    type: types.REQUEST_CUSTOMER
})

export const receiveCustomer= (customer) => ({
    type: types.RECEIVE_CUSTOMER,
    customer
})

export const invalidCreateCustomerRequest = validationResult => ({
    type: types.CREATE_CUSTOMER_FAILED,
    validationResult
})

export const customerCreated = customer => ({
    type: types.CREATE_CUSTOMER_SUCCESS,
    customer
})
