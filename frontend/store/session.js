const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT"

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    dispatch(logoutUser());
}
const initialState = {
    user: undefined
};

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);
    const nextState = { ...state };
    switch (action.type) {
        case RECEIVE_USER_LOGOUT:
            return initialState;
        default:
            return nextState;
    }
}

export default sessionReducer;