export const NeedActionType = {
    GET_ALL_NEEDS: 'GET_ALL_NEEDS',
    GET_SINGLE_NEED: 'GET_SINGLE_NEED',
    RESET_NEED: 'RESET_NEED',
    CREATE_NEEDS: 'CREATE_NEEDS',
    UPDATE_NEEDS: 'UPDATE_NEEDS',
    DELETE_NEEDS: 'DELETE_NEEDS',
    NEEDS_ERROR: 'NEEDS_ERROR',
}

export const getAllNeeds = needList => ({
    type: NeedActionType.GET_ALL_NEEDS,
    needList,
});

export const getSingleNeed = need => ({
    type: NeedActionType.GET_SINGLE_NEED,
    need,
});

export const createNeed = need => ({
    type: NeedActionType.DELETE_NEEDS,
    need
});

export const updateNeed = (need, id) => ({
    type: NeedActionType.UPDATE_NEEDS,
    need,
    id,
});

export const deleteNeed = id => ({
    type: NeedActionType.DELETE_NEEDS,
    id
});


export const resetNeed = need => ({
    type: NeedActionType.RESET_NEED,
    need
});


export const NEEDSError = error => ({
    type: NeedActionType.NEEDS_ERROR,
    error,
});