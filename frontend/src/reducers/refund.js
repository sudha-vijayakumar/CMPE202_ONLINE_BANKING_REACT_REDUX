import * as ActionTypes from '../actions/constants'

const refund = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case ActionTypes.REFUND_ACCOUNT:
            return Object.assign({}, state, {
                isFetching: true
            })
        case ActionTypes.REFUND_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            })
        default:
            return state
    }
}

export default refund
