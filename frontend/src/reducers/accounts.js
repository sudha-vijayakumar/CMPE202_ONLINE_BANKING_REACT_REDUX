import * as ActionTypes from '../actions/constants'

const accounts = (state = {
    isFetching: false,
    showTransferFundsButton: false,
    items: []
}, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_ACCOUNTS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case ActionTypes.RECEIVE_ACCOUNTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response,
                showTransferFundsButton: Array.isArray(action.response) && action.response.length > 1
            })
        default:
            return state
    }
}

export default accounts
