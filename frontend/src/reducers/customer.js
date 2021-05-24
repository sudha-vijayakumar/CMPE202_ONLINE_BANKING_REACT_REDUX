import * as ActionTypes from '../actions/constants'

const account = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_ACCOUNT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case ActionTypes.CREATE_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            })
        case ActionTypes.CREATE_ACCOUNT_FAILED:
            return Object.assign({}, state, {
            })
        default:
            return state
    }
}

export default account
