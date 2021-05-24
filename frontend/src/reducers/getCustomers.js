import * as ActionTypes from '../actions/constants'

const getCustomers = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_CUSTOMERS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case ActionTypes.RECEIVE_CUSTOMERS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            })
        default:
            return state
    }
}

export default getCustomers
