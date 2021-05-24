import * as ActionTypes from '../actions/constants'

const getInactiveAccounts = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_INACTIVE_ACCOUNT:
            return Object.assign({}, state, {
                isFetching: true
            })
        case ActionTypes.RECEIVE_INACTIVE_ACCOUNT:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            })
        default:
            return state
    }
}

export default getInactiveAccounts
