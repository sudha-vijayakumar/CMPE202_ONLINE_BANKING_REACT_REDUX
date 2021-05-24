import * as ActionTypes from '../actions/constants'

const extTransfer = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case ActionTypes.EXT_TRANSFER_ACCOUNT:
            return Object.assign({}, state, {
                isFetching: true
            })
        case ActionTypes.EXT_TRANSFER_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.response
            })
        default:
            return state
    }
}

export default extTransfer
