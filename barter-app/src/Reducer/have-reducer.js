import {HaveActionType} from '../Actions/HaveAction';

const initialState = {
    havesList: [],
    have: {}
};

 const haveReducer = (state = initialState, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type){
        case HaveActionType.GET_ALL_HAVES:
            return {
                ...state,
                havesList: action.havesList,
        };
        case HaveActionType.GET_SINGLE_HAVE:
            return {
                ...state,
                have: action.have,
        }; 

        case HaveActionType.RESET_HAVE:
            return{
                ...state,
                have: {}
            }

        case HaveActionType.HAVES_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
}

export default haveReducer;