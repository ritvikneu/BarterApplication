export const UserActionType = {
    GET_ALL_USER: 'GET_ALL_USER',
    GET_SINGLE_USER: 'GET_SINGLE_USER',
    // CREATE_NEEDS: 'CREATE_NEEDS',
    // UPDATE_NEEDS: 'UPDATE_NEEDS',
    // DELETE_NEEDS: 'DELETE_NEEDS',
    USER_ERROR: 'USER_ERROR',
}

export const getAllUser = userList => ({
    type: UserActionType.GET_ALL_USER,
    userList,
});

export const getSingleUser = user => ({
    type: UserActionType.GET_SINGLE_USER,
    user,
});

// export const createNeed = Need => ({
//     type: NeedActionType.DELETE_NEEDS,
//     Need
// });

// export const updateNeed = (Need, id) => ({
//     type: NeedActionType.UPDATE_NEEDS,
//     Need,
//     id,
// });

// export const deleteNeed = id => ({
//     type: NeedActionType.DELETE_NEEDS,
//     id
// });

export const userError = error => ({
    type: UserActionType.USER_ERROR,
    error,
});