import * as ActionTypes from '../actions/constants'

const deactivate = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case ActionTypes.DEACTIVATE_ACCOUNT:
            return Object.assign({}, state, {
                isFetching: true
            })
        case ActionTypes.DEACTIVATE_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            })
        default:
            return state
    }
}

export default deactivate
