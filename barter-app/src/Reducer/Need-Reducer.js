import {NeedActionType} from '../Actions/NeedAction';

const intialState = {
    needList: [],
    need: {}
};

 const needReducer = (state = intialState, action) => {
    if (typeof state === 'undefined') {
        return intialState;
    }
    switch (action.type){
        case NeedActionType.GET_ALL_NEEDS:
            return {
                ...state,
                needList: action.needList,
        };
        case NeedActionType.GET_SINGLE_NEED:
            return {
                ...state,
                need: action.need,
        }; 
        case NeedActionType.RESET_NEED:
            return {
                ...state,
                need:{}

            }

        case NeedActionType.NEEDS_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
}

export default needReducer;