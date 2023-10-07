import {UserActionType} from '../Actions/UserAction';

const user = JSON.parse(localStorage.getItem("user"));

// const initialState = user
//     ? {isLoggedIn: true, user, message: ''}
//     : {isLoggedIn: false, user: null, message: ''};

    const initialStateUser = {
        userList: [],
        user: {}
    };
    

    const userReducer = (state = initialStateUser, action) => {
        if (typeof state === 'undefined') {
            return initialStateUser;
        }
        switch (action.type){
            case UserActionType.GET_ALL_USER:
                return {
                    ...state,
                    userList: action.userList,
            };
            case UserActionType.GET_SINGLE_USER:
                return {
                    ...state,
                    user: action.user,
            }; 
    
            case UserActionType.USER_ERROR:
                return {
                    ...state,
                    error: action.error,
                };
            default:
                return state;
        }
    }
    
    export default userReducer;