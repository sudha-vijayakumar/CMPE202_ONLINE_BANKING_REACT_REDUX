import * as ActionTypes from '../actions/constants'

const activate = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ACTIVATE_ACCOUNT:
            return Object.assign({}, state, {
                isFetching: true
            })
        case ActionTypes.ACTIVATE_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            })
        case ActionTypes.ACTIVATE_ACCOUNT_FAILED:
            return Object.assign({}, state, {
            })
        default:
            return state
    }
}

export default activate
