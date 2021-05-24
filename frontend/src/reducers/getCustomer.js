import * as ActionTypes from '../actions/constants'

const getCustomer = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_CUSTOMER:
            return Object.assign({}, state, {
                isFetching: true
            })
        case ActionTypes.RECEIVE_CUSTOMER:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            })
        default:
            return state
    }
}

export default getCustomer
