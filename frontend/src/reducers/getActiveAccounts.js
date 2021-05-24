import * as ActionTypes from '../actions/constants'

const getActiveAccounts = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_ACTIVE_ACCOUNT:
            return Object.assign({}, state, {
                isFetching: true
            })
        case ActionTypes.RECEIVE_ACTIVE_ACCOUNT:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            })
        default:
            return state
    }
}

export default getActiveAccounts
