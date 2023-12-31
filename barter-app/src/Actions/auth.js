import AuthService from "../Services/api";

export const ActionType = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',//fetch users
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
  SET_MESSAGE:'SET_MESSAGE',
  ADMINSET_MESSAGE:'SET_MESSAGE',
  ONHOMEPAGE:'ONHOMEPAGE'
  
}

export const login = (emailID) => (dispatch) => {
    return AuthService.login(emailID).then(
        (data) => {
            dispatch({
                type: ActionType.LOGIN_SUCCESS,
                payload: {user: data},
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data)

            dispatch({
                type: ActionType.LOGIN_FAIL,
            });

            dispatch({
                type: ActionType.SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: ActionType.LOGOUT,
    });

};

export const onHomePage = () => (dispatch) => {

  dispatch({
    type: ActionType.ONHOMEPAGE,
  });

};